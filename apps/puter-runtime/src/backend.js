/*
 * Backend connector scaffold.
 *
 * Backend/database remains the source of truth.
 */

export async function connectBackend() {
  return {
    connected: false,
    reason: 'Backend runtime not implemented yet',
    plannedEndpoints: [
      '/health',
      '/commands/run',
      '/graph',
      '/events/ingest',
    ],
  };
}
