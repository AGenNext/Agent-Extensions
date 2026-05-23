# Agent Extensions

Agent Extensions adds lightweight GitHub and Docker extension surfaces for agent-native repository operations.

The project keeps small repositories small. Repositories only need `AGENTS.md` and optional `.github/repo-agent.yml`; the hosted extension and Docker extension provide the runtime.

## Extensions

- GitHub Extension: issue, pull request, workflow, and merge-conflict assistance through GitHub App and GitHub Actions surfaces.
- Docker Extension: local Docker Desktop panel for container, image, compose, and log analysis.

## MVP commands

```text
/agent analyze
/agent review
/agent fix-ci
/agent merge-check
/agent explain-conflict
/agent docker analyze
/agent docker logs <container>
```

## Default image registry

Docker extension images are published to GitHub Container Registry:

```text
ghcr.io/agennext/agent-docker-extension:latest
```

Docker Hub is optional later. GHCR is the default for v1 so code, docs, workflows, releases, and images stay inside GitHub.

## Repository layout

```text
apps/
  github-app/
  docker-extension/
packages/
  agent-core/
  github-tools/
  docker-tools/
  llm-provider/
docs/
examples/
  tiny-repo/
```
