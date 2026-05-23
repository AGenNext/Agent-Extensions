import {
  evaluatePolicy,
  formatCommandResponse,
  parseAgentCommand,
} from '@agennext/agent-core';

const comment = process.env.AGENT_COMMENT ?? '';

const command = parseAgentCommand(comment);

const policy = evaluatePolicy({
  commandType: command.type,
  destructive: command.type === 'resolve-conflict',
});

const response = formatCommandResponse(command, policy);

console.log(response);

if (!policy.allowed) {
  process.exit(1);
}
