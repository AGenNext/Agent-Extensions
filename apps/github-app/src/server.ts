import http from 'node:http';
import { Webhooks } from '@octokit/webhooks';
import { evaluatePolicy, parseAgentCommand } from '@agennext/agent-core';

const port = Number(process.env.PORT ?? 3000);
const secret = process.env.GITHUB_WEBHOOK_SECRET ?? 'development-secret';

const webhooks = new Webhooks({
  secret,
});

webhooks.on('issue_comment.created', async ({ payload }) => {
  const comment = payload.comment.body;

  if (!comment.includes('/agent')) {
    return;
  }

  const command = parseAgentCommand(comment);

  const policy = evaluatePolicy({
    commandType: command.type,
    destructive: command.type === 'resolve-conflict',
  });

  console.log('Slash command received');
  console.log(JSON.stringify(command, null, 2));
  console.log(JSON.stringify(policy, null, 2));
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
