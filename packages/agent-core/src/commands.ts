export type AgentCommand =
  | { type: 'analyze'; target?: string }
  | { type: 'review'; pullRequestId?: number }
  | { type: 'fix-ci'; runId?: string }
  | { type: 'merge-check' }
  | { type: 'explain-conflict' }
  | { type: 'resolve-conflict' }
  | { type: 'docker.analyze'; container?: string }
  | { type: 'docker.logs'; container?: string }
  | { type: 'implement'; task: string };

export function parseAgentCommand(input: string): AgentCommand {
  const text = input.trim();

  if (text.startsWith('/agent review')) {
    return { type: 'review' };
  }

  if (text.startsWith('/agent fix-ci')) {
    return { type: 'fix-ci' };
  }

  if (text.startsWith('/agent merge-check')) {
    return { type: 'merge-check' };
  }

  if (text.startsWith('/agent explain-conflict')) {
    return { type: 'explain-conflict' };
  }

  if (text.startsWith('/agent resolve-conflict')) {
    return { type: 'resolve-conflict' };
  }

  if (text.startsWith('/agent docker analyze')) {
    return {
      type: 'docker.analyze',
      container: text.replace('/agent docker analyze', '').trim() || undefined,
    };
  }

  if (text.startsWith('/agent docker logs')) {
    return {
      type: 'docker.logs',
      container: text.replace('/agent docker logs', '').trim() || undefined,
    };
  }

  if (text.startsWith('/agent implement')) {
    return {
      type: 'implement',
      task: text.replace('/agent implement', '').trim(),
    };
  }

  return {
    type: 'analyze',
    target: text.replace('/agent analyze', '').trim() || undefined,
  };
}
