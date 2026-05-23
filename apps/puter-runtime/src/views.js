/*
 * Puter.js view contracts.
 *
 * These define the UI/data surfaces the Puter runtime should expose.
 */

export const views = {
  dashboard: {
    id: 'view.dashboard',
    title: 'Agent Extensions Dashboard',
    dataSources: ['backend.health', 'commands.recent', 'graph.summary'],
  },
  commands: {
    id: 'view.commands',
    title: 'Command Runs',
    dataSources: ['commands.runs', 'commands.steps', 'audit.logs'],
  },
  graph: {
    id: 'view.graph',
    title: 'Schema Graph',
    dataSources: ['graph.nodes', 'graph.edges', 'compliance.report'],
  },
  approvals: {
    id: 'view.approvals',
    title: 'Human Approvals',
    dataSources: ['approvals.pending', 'approvals.history'],
  },
  integrations: {
    id: 'view.integrations',
    title: 'GitHub and Docker Bridges',
    dataSources: ['github.status', 'docker.status', 'bridge.events'],
  },
};

export function listViews() {
  return Object.values(views);
}
