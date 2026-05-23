/*
 * Node bridge preserved intentionally.
 *
 * Direction update:
 * - Puter.js is the preferred runtime and userland surface going forward.
 * - This Node server remains as a thin GitHub webhook bridge where a server-side
 *   receiver is required by GitHub App webhooks.
 * - Do not delete this file until the Puter.js runtime has an equivalent secure
 *   webhook bridge or the backend owns webhook ingestion fully.
 */

import crypto from 'node:crypto';
import http from 'node:http';
import { Webhooks } from '@octokit/webhooks';
import {
  evaluatePolicy,
  formatCommandResponse,
  parseAgentCommand,
  safelyExecute,
} from '@agennext/agent-core';
import { publishComment } from '@agennext/github-tools';
import { persistGithubCommandRun } from './backend-client.js';

const port = Number(process.env.PORT ?? 3000);
const secret = process.env.GITHUB_WEBHOOK_SECRET ?? 'development-secret';
const githubToken = process.env.GITHUB_TOKEN ?? '';

const webhooks = new Webhooks({
  secret,
});

webhooks.on('issue_comment.created', async ({ payload }) => {
  const comment = payload.comment.body;

  if (!comment.includes('/agent')) {
    return;
  }

  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;
  const issueNumber = payload.issue.number;
  const actor = payload.comment.user.login;

  const result = await safelyExecute('github-command-loop', async () => {
    const command = parseAgentCommand(comment);

    const policy = evaluatePolicy({
      commandType: command.type,
      destructive: command.type === 'resolve-conflict',
    });

    const response = formatCommandResponse(command, policy);

    const commandRunId = crypto.randomUUID();

    const backendResult = await persistGithubCommandRun({
      commandRunId,
      commandType: command.type,
      actor,
      status: policy.allowed ? 'accepted' : 'blocked',
      repository: `${owner}/${repo}`,
    });

    if (!backendResult.ok) {
      console.warn('Backend persistence unavailable', backendResult);
    }

    if (!githubToken) {
      console.warn('Missing GITHUB_TOKEN. Falling back to log-only mode.');

      return {
        status: 'partial',
        title: 'GitHub token missing',
        summary: response,
        actionsTaken: [
          'Parsed command',
          'Evaluated policy',
          'Attempted backend persistence',
        ],
        nextActions: ['Configure GITHUB_TOKEN'],
        errors: ['GitHub comment publishing disabled'],
      };
    }

    await publishComment({
      token: githubToken,
      owner,
      repo,
      issueNumber,
      body: response,
    });

    return {
      status: 'success',
      title: 'GitHub command processed',
      summary: response,
      actionsTaken: [
        'Persisted command run to backend',
        'Published GitHub comment',
      ],
      nextActions: [],
      errors: backendResult.ok ? [] : ['Backend persistence unavailable'],
    };
  });

  console.log(JSON.stringify(result, null, 2));
});

const server = http.createServer(async (request, response) => {
  if (request.method !== 'POST') {
    response.writeHead(200);
    response.end('Agent extension server running');
    return;
  }

  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString('utf8');

  const id = request.headers['x-github-delivery'];
  const signature = request.headers['x-hub-signature-256'];
  const event = request.headers['x-github-event'];

  if (
    typeof id !== 'string' ||
    typeof signature !== 'string' ||
    typeof event !== 'string'
  ) {
    response.writeHead(400);
    response.end('Missing GitHub headers');
    return;
  }

  try {
    await webhooks.verifyAndReceive({
      id,
      name: event as any,
      signature,
      payload: body,
    });

    response.writeHead(200);
    response.end('Webhook processed');
  } catch (error) {
    console.error(error);

    response.writeHead(500);
    response.end('Webhook failed');
  }
});

server.listen(port, () => {
  console.log(`GitHub Agent Extension listening on :${port}`);
});
