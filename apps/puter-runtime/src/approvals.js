/*
 * Human approval flow scaffold.
 *
 * Destructive or high-risk actions must require explicit approval.
 */

export async function requestApproval(action) {
  return {
    approved: false,
    pending: true,
    action,
    reason: 'Approval UI not implemented yet',
  };
}
