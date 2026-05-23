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
import {
  getRuntimeState,
  listApprovals,
  listAuditLogs,
  listCommandRuns,
  listGraphSyncs,
  persistApprovalRequest,
  persistAuditLog,
  persistCommandRun,
  persistGraphSync,
} from './storage/memory-store.js';

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

function audit(action, metadata = {}) {
  persistAuditLog({
    action,
    metadata,
  });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`);

  if (request.method === 'GET' && url.pathname === '/health') {
    send(response, 200, {
      ok: true,
      runtime: 'agennext-backend',
      status: 'scaffolded',
      state: getRuntimeState(),
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/commands') {
    send(response, 200, {
      ok: true,
      data: listCommandRuns(),
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/graph/syncs') {
    send(response, 200, {
      ok: true,
      data: listGraphSyncs(),
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/approvals') {
    send(response, 200, {
      ok: true,
      data: listApprovals(),
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/audit/logs') {
    send(response, 200, {
      ok: true,
      data: listAuditLogs(),
    });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/commands/run') {
    const payload = await readJson(request);
    const validation = validateCommandRun(payload);

    if (!validation.valid) {
      send(response, 400, {
        ok: false,
        type: 'command_run',
        validation,
      });
      return;
    }

    const persisted = persistCommandRun(payload);

    audit('command_run.persisted', {
      command_run_id: payload.command_run_id,
    });

    send(response, 202, {
      ok: true,
      type: 'command_run',
      validation,
      persisted: true,
      data: persisted,
    });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/graph/sync') {
    const payload = await readJson(request);
    const validation = validateGraphSync(payload);

    if (!validation.valid) {
      send(response, 400, {
        ok: false,
        type: 'graph_sync',
        validation,
      });
      return;
    }

    const persisted = persistGraphSync(payload);

    audit('graph_sync.persisted', {
      graph_id: payload.graph_id,
    });

    send(response, 202, {
      ok: true,
      type: 'graph_sync',
      validation,
      persisted: true,
      data: persisted,
    });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/approvals/request') {
    const payload = await readJson(request);
    const validation = validateApprovalRequest(payload);

    if (!validation.valid) {
      send(response, 400, {
        ok: false,
        type: 'approval_request',
        validation,
      });
      return;
    }

    const persisted = persistApprovalRequest(payload);

    audit('approval_request.persisted', {
      approval_id: payload.approval_id,
    });

    send(response, 202, {
      ok: true,
      type: 'approval_request',
      validation,
      persisted: true,
      data: persisted,
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
