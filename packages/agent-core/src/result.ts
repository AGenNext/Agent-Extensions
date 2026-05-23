export type CommandStatus = 'success' | 'partial' | 'blocked' | 'failed';

export type CommandResult = {
  status: CommandStatus;
  title: string;
  summary: string;
  actionsTaken: string[];
  nextActions: string[];
  errors: string[];
};

export function successResult(input: Partial<CommandResult> & Pick<CommandResult, 'title' | 'summary'>): CommandResult {
  return {
    status: 'success',
    actionsTaken: [],
    nextActions: [],
    errors: [],
    ...input,
  };
}

export function partialResult(input: Partial<CommandResult> & Pick<CommandResult, 'title' | 'summary'>): CommandResult {
  return {
    status: 'partial',
    actionsTaken: [],
    nextActions: [],
    errors: [],
    ...input,
  };
}

export function blockedResult(input: Partial<CommandResult> & Pick<CommandResult, 'title' | 'summary'>): CommandResult {
  return {
    status: 'blocked',
    actionsTaken: [],
    nextActions: [],
    errors: [],
    ...input,
  };
}

export function failedResult(input: Partial<CommandResult> & Pick<CommandResult, 'title' | 'summary'>): CommandResult {
  return {
    status: 'failed',
    actionsTaken: [],
    nextActions: [],
    errors: [],
    ...input,
  };
}
