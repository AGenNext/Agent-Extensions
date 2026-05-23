import { evaluatePolicy, parseAgentCommand } from '@agennext/agent-core';

const comment = process.env.AGENT_COMMENT ?? '';

const command = parseAgentCommand(comment);

const policy = evaluatePolicy({
  commandType: command.type,
  destructive: command.type === 'resolve-conflict',
});

console.log('Agent command received');
console.log(JSON.stringify(command, null, 2));
console.log(JSON.stringify(policy, null, 2));

if (!policy.allowed) {
  console.error(policy.reason);
  process.exit(1);
}

console.log('Command accepted.');
