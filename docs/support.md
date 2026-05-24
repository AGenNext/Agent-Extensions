# Support

## Current status

AGenNext Agent Extensions is currently in internal alpha/runtime-scaffold stage.

## Supported runtime areas

```text
GitHub integration
Docker diagnostics
Backend runtime
Graph synchronization
Approval workflows
Puter runtime scaffolds
```

## Known limitations

```text
Real database adapter not connected
Docker Desktop validation incomplete
Marketplace publishing incomplete
Puter dashboard not wired to live backend state yet
```

## Reporting issues

Use GitHub Issues for:

- runtime failures
- webhook failures
- Docker diagnostics issues
- graph synchronization issues
- approval flow issues
- publishing issues

## Runtime guarantees

- no silent failures
- prefer partial success over hard failure
- generated changes should go through pull requests
- policy gates destructive actions

## Alpha disclaimer

This project is not yet production hardened.
