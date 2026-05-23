/*
 * Approval engine scaffold.
 *
 * Responsible for creating and tracking human approval requests for protected
 * or destructive actions. Approval state is policy-driven and persisted by the
 * backend source-of-truth layer.
 */

import { persistApprovalRequest } from '../storage/memory-store.js';

export async function requestApproval(payload = {}) {
  const approvalId = payload.approval_id || `approval_${Date.now()}`;

  const record = persistApprovalRequest({
    approval_id: approvalId,
    action: payload.action,
    risk_level: payload.risk_level || 'unknown',
    status: payload.status || 'pending',
    actor: payload.actor || 'unknown',
    reason: payload.reason || 'Approval required by policy.',
    source: payload.source || 'backend_approval_engine',
  });

  return {
    ok: true,
    approval_id: approvalId,
    status: record.status,
    risk_level: record.risk_level,
    persisted: true,
    next_actions: [
      'Render approval request in Puter runtime',
      'Wait for explicit human decision',
      'Audit approval decision before execution',
    ],
  };
}
