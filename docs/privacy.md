# Privacy Policy

AGenNext Agent Extensions is designed around explicit runtime boundaries and auditable execution.

## Data handled

The system may process:

- GitHub issue and pull request comments
- Repository metadata
- Pull request metadata and diffs
- GitHub Actions workflow metadata and logs
- Docker runtime diagnostics
- Command execution records
- Approval requests
- Audit logs
- Schema graph metadata

## Source of truth

The AGenNext backend/database is the source of truth for command runs, graph state, approvals, memories, and audit logs.

## Runtime surfaces

```text
Puter.js runtime      → userland orchestration surface
AGenNext backend      → persistence and source of truth
Node bridge           → preserved webhook compatibility bridge
GitHub/Docker bridges → integration surfaces
Schema graphs         → capability and compliance truth
```

## Secrets

Secrets must not be exposed in logs, comments, generated responses, patches, or diagnostics.

## Generated changes

Generated code changes should go through pull requests. The agent should not push directly to `main`.

## Auditability

Policy decisions, approval requests, command runs, and persisted actions should be auditable.

## Current status

This policy is a draft for alpha testing and should be reviewed before public marketplace submission.
