export type PolicyDecision = {
  allowed: boolean;
  requiresApproval: boolean;
  reason?: string;
};

export type PolicyInput = {
  commandType: string;
  destructive?: boolean;
  touchesSecrets?: boolean;
  deploysProduction?: boolean;
};

export function evaluatePolicy(input: PolicyInput): PolicyDecision {
  if (input.touchesSecrets) {
    return {
      allowed: false,
      requiresApproval: false,
      reason: 'Secret access is blocked.',
    };
  }

  if (input.deploysProduction || input.destructive) {
    return {
      allowed: false,
      requiresApproval: true,
      reason: 'This action requires human approval.',
    };
  }

  if (input.commandType === 'implement') {
    return {
      allowed: true,
      requiresApproval: true,
      reason: 'Implementation actions must open a PR.',
    };
  }

  return {
    allowed: true,
    requiresApproval: false,
  };
}
