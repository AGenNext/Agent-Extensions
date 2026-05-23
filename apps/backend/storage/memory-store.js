/*
 * In-memory persistence adapter.
 *
 * This is a temporary development adapter until the AGenNext database is connected.
 * It preserves the backend source-of-truth contract without introducing external
 * database requirements during scaffold development.
 */

const state = {
  commandRuns: [],
  graphSyncs: [],
  approvals: [],
  auditLogs: [],
};

function now() {
  return new Date().toISOString();
}

export function persistCommandRun(commandRun) {
  const record = {
    ...commandRun,
    persisted_at: now(),
  };

  state.commandRuns.push(record);

  return record;
}

export function persistGraphSync(graphSync) {
  const record = {
    ...graphSync,
    persisted_at: now(),
  };

  state.graphSyncs.push(record);

  return record;
}

export function persistApprovalRequest(approvalRequest) {
  const record = {
    ...approvalRequest,
    status: approvalRequest.status || 'pending',
    persisted_at: now(),
  };

  state.approvals.push(record);

  return record;
}

export function persistAuditLog(auditLog) {
  const record = {
    ...auditLog,
    persisted_at: now(),
  };

  state.auditLogs.push(record);

  return record;
}

export function getRuntimeState() {
  return {
    commandRuns: state.commandRuns.length,
    graphSyncs: state.graphSyncs.length,
    approvals: state.approvals.length,
    auditLogs: state.auditLogs.length,
  };
}

export function listCommandRuns() {
  return state.commandRuns;
}

export function listGraphSyncs() {
  return state.graphSyncs;
}

export function listApprovals() {
  return state.approvals;
}

export function listAuditLogs() {
  return state.auditLogs;
}
