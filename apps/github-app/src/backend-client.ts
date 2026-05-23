/*
 * GitHub bridge backend client.
 *
 * The GitHub webhook bridge should report command runs to the AGenNext backend,
 * which is the source of truth. This client degrades safely when the backend is
 * unavailable.
 */

type BackendResult = {
  ok: boolean;
  status: number;
  body?: unknown;
  error?: string;
};

const defaultBackendUrl = process.env.AGENT_BACKEND_URL ?? 'http://localhost:3100';

async function request(path: string, init: RequestInit = {}): Promise<BackendResult> {
  try {
    const response = await fetch(`${defaultBackendUrl}${path}`, {
      headers: {
        'content-type': 'application/json',
        ...(init.headers ?? {}),
      },
      ...init,
    });

    const body = await response.json().catch(() => undefined);

    return {
      ok: response.ok,
      status: response.status,
      body,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : 'Unknown backend error',
    };
  }
}

export async function persistGithubCommandRun(input: {
  commandRunId: string;
  commandType: string;
  actor: string;
  status: string;
  repository: string;
}) {
  return request('/commands/run', {
    method: 'POST',
    body: JSON.stringify({
      command_run_id: input.commandRunId,
      command_type: input.commandType,
      actor: input.actor,
      status: input.status,
      repository: input.repository,
      provider: 'github',
    }),
  });
}
