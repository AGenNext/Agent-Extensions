/*
 * Puter ↔ Backend bridge contract.
 *
 * Defines the expected runtime relationship between:
 * - Puter.js runtime
 * - AGenNext backend/database
 * - Compatibility bridge services
 */

export const bridgeContract = {
  runtime: 'puter.js',
  backend: 'agennext-backend',
  sourceOfTruth: 'backend-database',
  contracts: {
    commandRun: {
      endpoint: '/commands/run',
      requiredFields: [
        'command_run_id',
        'command_type',
        'status',
        'actor',
      ],
    },
    graphSync: {
      endpoint: '/graph/sync',
      requiredFields: [
        'graph_id',
        'nodes',
        'edges',
      ],
    },
    approvals: {
      endpoint: '/approvals/request',
      requiredFields: [
        'approval_id',
        'action',
        'risk_level',
      ],
    },
  },
  runtimeRules: [
    'No silent failures',
    'Prefer partial success over hard failure',
    'Policy gates all actions',
    'Schema graph is capability truth',
    'Backend/database is source of truth',
  ],
};
