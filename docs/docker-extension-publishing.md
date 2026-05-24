# Docker Extension Publishing Verification

## Goal
Verify that the Agent Docker Extension can be built, published to GHCR, pulled, and loaded in Docker Desktop.

## Target image

```text
ghcr.io/agennext/agent-docker-extension:latest
```

## Build locally

```bash
docker build \
  -t ghcr.io/agennext/agent-docker-extension:latest \
  apps/docker-extension
```

## Run locally

```bash
docker run --rm -p 3000:3000 ghcr.io/agennext/agent-docker-extension:latest
```

## Health check

```bash
curl http://localhost:3000/health
```

Expected behavior:

```json
{
  "ok": true,
  "service": "agent-docker-extension"
}
```

## Publish through GitHub Actions

Use the workflow:

```text
.github/workflows/publish-docker-extension.yml
```

It publishes:

```text
ghcr.io/<owner>/agent-docker-extension:latest
ghcr.io/<owner>/agent-docker-extension:<commit-sha>
```

## Pull from GHCR

```bash
docker pull ghcr.io/agennext/agent-docker-extension:latest
```

## Docker Desktop validation

Validate:

- Extension image pulls successfully
- Extension starts without hard failure
- UI loads
- Backend `/health` returns structured success
- Diagnostics endpoints return structured output or partial results

## Runtime guarantees

- No silent failures
- Return structured partial results when Docker APIs are unavailable
- Do not delete containers without approval
- Do not modify compose files without PR or explicit approval
- Audit every diagnostic action

## Current blockers

```text
Docker Desktop load has not been verified.
GHCR package visibility has not been verified.
Final diagnostics endpoints are still scaffolded.
```
