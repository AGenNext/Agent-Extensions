/*
 * Backend contract validator scaffold.
 *
 * Validators should ensure runtime payloads comply with graph-defined contracts.
 */

export function validateRequiredFields(payload = {}, requiredFields = []) {
  const missing = requiredFields.filter((field) => !(field in payload));

  return {
    valid: missing.length === 0,
    missing,
  };
}

export function validateCommandRun(payload = {}) {
  return validateRequiredFields(payload, [
    'command_run_id',
    'command_type',
    'actor',
    'status',
  ]);
}

export function validateGraphSync(payload = {}) {
  return validateRequiredFields(payload, [
    'graph_id',
    'nodes',
    'edges',
  ]);
}

export function validateApprovalRequest(payload = {}) {
  return validateRequiredFields(payload, [
    'approval_id',
    'action',
    'risk_level',
  ]);
}
