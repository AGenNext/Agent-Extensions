import {
  failedResult,
  partialResult,
  type CommandResult,
} from './result.js';

export async function safelyExecute(
  title: string,
  operation: () => Promise<CommandResult>,
): Promise<CommandResult> {
  try {
    return await operation();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return partialResult({
      title,
      summary: 'The command encountered an issue but recovered safely.',
      errors: [message],
      nextActions: [
        'Inspect runtime logs',
        'Retry command after dependency verification',
      ],
    });
  }
}

export async function failClosed(
  title: string,
  operation: () => Promise<CommandResult>,
): Promise<CommandResult> {
  try {
    return await operation();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return failedResult({
      title,
      summary: 'The command failed and requires manual inspection.',
      errors: [message],
    });
  }
}
