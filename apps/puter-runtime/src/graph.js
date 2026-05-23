/*
 * Puter.js graph view scaffold.
 *
 * Schema graph remains the source of truth for capabilities and compliance.
 */

export async function loadGraph() {
  return {
    loaded: false,
    source: 'schema/*.graph.yaml',
    nextActions: [
      'Connect backend graph API',
      'Render capability graph',
      'Render compliance graph',
    ],
  };
}
