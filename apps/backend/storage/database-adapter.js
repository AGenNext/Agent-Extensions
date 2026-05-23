/*
 * Database adapter contract scaffold.
 *
 * The in-memory adapter is active for development. This contract defines the
 * shape required by the future AGenNext database-backed implementation.
 */

export const databaseAdapterContract = {
  name: 'agennext-database-adapter',
  status: 'planned',
  requiredMethods: [
    'persistInstallation',
    'persistRepository',
    'persistEvent',
    'persistCommandRun',
    'persistCommandStep',
    'persistPolicyDecision',
    'persistAuditLog',
    'persistGraphNode',
    'persistGraphEdge',
    'persistMemory',
    'persistArtifact',
  ],
  runtimeRules: [
    'No silent failures',
    'Return structured partial results on dependency failures',
    'Audit every persisted decision',
    'Keep schema graph and database model aligned',
  ],
};

export function createDatabaseAdapter() {
  return {
    status: 'not_connected',
    contract: databaseAdapterContract,
    reason: 'AGenNext database adapter has not been connected yet.',
  };
}
