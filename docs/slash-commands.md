# Slash Commands

Agent Extensions supports GitHub-native slash commands.

## Supported commands

```text
/agent analyze
/agent review
/agent fix-ci
/agent merge-check
/agent explain-conflict
/agent resolve-conflict
/agent docker analyze
/agent docker logs <container>
/agent implement <task>
```

## Examples

### Analyze repository issue

```text
/agent analyze
```

### Review pull request

```text
/agent review
```

### Explain CI failure

```text
/agent fix-ci
```

### Check mergeability

```text
/agent merge-check
```

### Explain merge conflict

```text
/agent explain-conflict
```

### Request implementation

```text
/agent implement add request validation middleware
```

## Safety

The extension should:

- Never push directly to main
- Never expose secrets
- Require approval for destructive actions
- Prefer pull requests for generated code
