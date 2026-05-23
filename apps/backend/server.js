/*
 * AGenNext backend runtime scaffold.
 *
 * This backend is the source of truth for Agent Extensions.
 * It is intentionally resilient and returns structured responses.
 */

import http from 'node:http';
import {
  validateApprovalRequest,
  validateCommandRun,
  validateGraphSync,
} from './contracts/validator.js';

const port = Number(process.env.PORT || 3100);

async function readJson(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');

  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return { _invalidJson: true };
  }
}

function send(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.end(JSON.stringify(body, null, 2));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`);

  if (request.method === 'GET' && url.pathname === '/health') {
    send(response, 200, {
      ok: true,
      runtime: 'agennext-backend',
      status: 'scaffolded',
    });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/commands/run') {
    const payload = await readJson(request);
    const validation = validateCommandRun(payload);

    send(response, validation.valid ? 202 : 400, {
      ok: validation.valid,
      type: 'command_run',
      validation,
      persisted: false,
      note: 'Persistence adapter not connected yet.',
    });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/graph/sync') {
    const payload = await readJson(request);
    const validation = validateGraphSync(payload);

    send(response, validation.valid ? 202 : 400, {
      ok: validation.valid,
      type: 'graph_sync',
      validation,
      persisted: false,
      note: 'Graph persistence adapter not connected yet.',
    });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/approvals/request') {
    const payload = await readJson(request);
    const validation = validateApprovalRequest(payload);

    send(response, validation.valid ? 202 : 400, {
      ok: validation.valid,
      type: 'approval_request',
      validation,
      persisted: false,
      note: 'Approval persistence adapter not connected yet.',
    });
    return;
  }

  send(response, 404, {
    ok: false,
    error: 'Not found',
    path: url.pathname,
  });
});

server.listen(port, () => {
  console.log(`AGenNext backend scaffold listening on ${port}`);
});
