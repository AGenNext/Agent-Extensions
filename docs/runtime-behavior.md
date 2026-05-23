# Runtime Behavior

Agent Extensions should avoid unnecessary hard failures.

## Runtime principles

```text
Detect
→ Diagnose
→ Propose
→ Execute safely
→ Verify
→ Report
```

## Expected behavior

### If a dependency is missing

The runtime should:

- explain what is missing
- continue with partial functionality when possible
- provide next actions

### If a command is unsafe

The runtime should:

- block execution
- explain why
- request approval if appropriate

### If execution partially succeeds

The runtime should:

- report completed actions
- report incomplete actions
- suggest recovery steps

### If a build fails

The runtime should:

- inspect logs
- identify likely root cause
- propose or apply safe fixes
- avoid silent exits

## Goal

The agent should behave like an autonomous operational assistant rather than a static command bot.
