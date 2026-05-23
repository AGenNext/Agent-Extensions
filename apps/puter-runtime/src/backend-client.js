/*
 * Puter runtime backend client scaffold.
 *
 * This client is intentionally resilient: calls return structured partial results
 * instead of throwing whenever the backend is unavailable.
 */

const defaultBaseUrl = 'http://localhost:3000';

export function createBackendClient(options = {}) {
  const baseUrl = options.baseUrl || defaultBaseUrl;

  async function request(path, init = {}) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: {
          'content-type': 'application/json',
          ...(init.headers || {}),
        },
        ...init,
      });

      const body = await response.json().catch(() => null);

      return {
        ok: response.ok,
        status: response.status,
        body,
      };
    } catch (error) {
      return {
        ok: false,
        status: 0,
        body: null,
        error: error instanceof Error ? error.message : 'Unknown backend error',
      };
    }
  }

  return {
    health() {
      return request('/health');
    },

    runCommand(commandRun) {
      return request('/commands/run', {
        method: 'POST',
        body: JSON.stringify(commandRun),
      });
    },

    syncGraph(graphPayload) {
      return request('/graph/sync', {
        method: 'POST',
        body: JSON.stringify(graphPayload),
      });
    },

    requestApproval(approvalRequest) {
      return request('/approvals/request', {
        method: 'POST',
        body: JSON.stringify(approvalRequest),
      });
    },
  };
}
