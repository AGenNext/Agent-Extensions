# Docker Extension

The Docker Extension provides local runtime visibility for agent-native development workflows.

## Capabilities

- List containers
- Inspect logs
- Analyze compose failures
- Explain Dockerfile issues
- Connect local findings back to GitHub issues and pull requests

## Default image

```text
ghcr.io/agennext/agent-docker-extension:latest
```

## Docker Desktop integration

The extension is designed to run as a Docker Desktop extension using GHCR-hosted images.

## Metadata example

```json
{
  "vm": {
    "image": "ghcr.io/agennext/agent-docker-extension:latest"
  }
}
```
