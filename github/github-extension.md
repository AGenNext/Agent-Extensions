# GitHub Extension

The GitHub Extension provides lightweight repository operations for agent-native workflows.

## Goals

- Keep small repositories lightweight
- Avoid embedding large agent runtimes into every repo
- Support GitHub-native workflows
- Support merge-conflict analysis
- Support CI troubleshooting
- Support review assistance

## Commands

```text
/agent analyze
/agent review
/agent fix-ci
/agent merge-check
/agent explain-conflict
/agent resolve-conflict
```

## Architecture

```text
GitHub issue / PR / comment
        ↓
GitHub App webhook
        ↓
Hosted extension runtime
        ↓
Repo context analysis
        ↓
LLM planning layer
        ↓
GitHub comments / PRs / workflows
```

## Merge conflict flow

```text
PR conflict detected
        ↓
Agent inspects conflicting files
        ↓
Agent explains root cause
        ↓
Agent proposes merge strategy
        ↓
Optional draft PR
```

## Safety policy

- Never push directly to main
- Never expose secrets
- Never silently overwrite branches
- Require approval for destructive actions
- Prefer draft PRs for generated changes
