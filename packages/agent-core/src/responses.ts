import type { AgentCommand } from './commands.js';
import type { PolicyDecision } from './policy.js';

export function formatCommandResponse(command: AgentCommand, policy: PolicyDecision): string {
  const lines = [
    '## Agent command received',
    '',
    `Command: \`${command.type}\``,
    '',
  ];

  if (!policy.allowed) {
    lines.push('### Policy decision');
    lines.push('Blocked.');
    lines.push('');
    lines.push(policy.reason ?? 'No reason provided.');
    return lines.join('\n');
  }

  if (policy.requiresApproval) {
    lines.push('### Policy decision');
    lines.push('Allowed, but requires human approval before execution.');
    lines.push('');
    if (policy.reason) {
      lines.push(policy.reason);
      lines.push('');
    }
  }

  lines.push('### Next action');

  switch (command.type) {
    case 'analyze':
      lines.push('I will analyze the repository context and summarize the next best action.');
      break;
    case 'review':
      lines.push('I will inspect the pull request diff and prepare a review summary.');
      break;
    case 'fix-ci':
      lines.push('I will inspect recent workflow failures and identify likely fixes.');
      break;
    case 'merge-check':
      lines.push('I will check whether this pull request is mergeable and report conflicts if present.');
      break;
    case 'explain-conflict':
      lines.push('I will explain the conflict and recommend a safe resolution strategy.');
      break;
    case 'resolve-conflict':
      lines.push('Conflict resolution requires approval. I will not force-push or overwrite branches.');
      break;
    case 'docker.analyze':
      lines.push('I will inspect Docker runtime context when connected to the Docker extension.');
      break;
    case 'docker.logs':
      lines.push('I will inspect container logs when connected to the Docker extension.');
      break;
    case 'implement':
      lines.push('Implementation must happen through a pull request.');
      break;
  }

  return lines.join('\n');
}
