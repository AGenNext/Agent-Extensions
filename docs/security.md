# Security Model

## Runtime principles

- No silent failures
- Prefer partial success over hard failure
- Policy gates all actions
- Backend/database is source of truth
- Schema graph is compliance truth
- Generated code changes go through pull requests
- Destructive actions require approval
- Audit every action

## Runtime boundaries

```text
LLM reasoning layer
  → orchestration runtime
  → backend persistence
  → audited execution
```

## Approval requirements

Protected or destructive actions should require explicit approval.

Examples:

- deleting containers
- force-pushing branches
- overwriting merge conflicts
- modifying protected infrastructure

## GitHub runtime guarantees

- generated changes should go through pull requests
- no direct push to main for generated fixes
- merge conflict resolutions should not force-push
- policy-blocked actions should return structured responses

## Docker runtime guarantees

- Docker API failures should return partial structured results
- diagnostics should avoid destructive actions by default
- compose modifications should go through review or approval

## Audit model

The runtime should preserve:

- command runs
- approvals
- graph sync events
- policy decisions
- diagnostics actions
- review actions
- merge conflict actions

## Current status

This security model is an alpha-stage operational draft.
