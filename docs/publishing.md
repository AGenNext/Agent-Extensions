# Publishing Guide

This document compares the current repository state against the required publishing path for the GitHub and Docker extensions.

## Current status

### Implemented

- Root README
- GitHub extension architecture docs
- Docker extension architecture docs
- Slash command docs
- Runtime behavior docs
- Environment variable docs
- GitHub App setup docs
- Deployment guide
- GitHub Pages workflow
- Docker GHCR build workflow
- Repo Agent workflow scaffold
- Agent command parser
- Policy engine
- Response formatter
- Resilient result model
- Safe executor wrapper
- GitHub webhook server skeleton
- GitHub comment publishing helper
- Docker extension metadata
- Docker backend stub
- Docker UI stub

### Incomplete

- GitHub webhook server is not yet publishing comments through Octokit
- GitHub App authentication is not yet fully implemented
- Dockerfile needs final runtime wiring
- Docker extension image has not yet been confirmed published to GHCR
- GitHub Pages must be enabled in repository settings
- Marketplace listing assets are not prepared
- Docker Extension listing assets are not prepared

## GitHub publishing path

### 1. Complete runtime wiring

Required before public submission:

- Webhook receives `/agent` command
- Command is parsed
- Policy is evaluated
- Response is formatted
- Response is posted back to the issue or PR

### 2. Deploy hosted runtime

Deploy the GitHub App runtime to one of:

- Fly.io
- Railway
- Render
- Vercel
- Kubernetes

Required environment variables:

```text
PORT=3000
GITHUB_WEBHOOK_SECRET=replace-me
GITHUB_TOKEN=replace-me
```

### 3. Register GitHub App

Configure:

```text
Homepage URL: https://github.com/AGenNext/Agent-Extensions
Webhook URL: https://YOUR_HOST/webhooks/github
```

Required permissions:

```text
Metadata: Read-only
Contents: Read and write
Issues: Read and write
Pull requests: Read and write
Actions: Read-only
Checks: Read and write
```

Required events:

```text
issue_comment
issues
pull_request
pull_request_review
workflow_run
```

### 4. Test commands

Test in a private or internal repo first:

```text
/agent analyze
/agent review
/agent fix-ci
/agent merge-check
/agent explain-conflict
```

### 5. Prepare public listing

Required before GitHub Marketplace submission:

- App name
- Short description
- Full description
- Logo/icon
- Screenshots
- Privacy policy
- Terms of service
- Support URL
- Pricing, even if free

## Docker publishing path

### 1. Complete Docker runtime

Required before public submission:

- `apps/docker-extension/metadata.json`
- `apps/docker-extension/Dockerfile`
- `apps/docker-extension/backend/server.js`
- `apps/docker-extension/ui/index.html`

### 2. Build image

```bash
docker build -t ghcr.io/agennext/agent-docker-extension:latest apps/docker-extension
```

### 3. Publish image to GHCR

```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
docker push ghcr.io/agennext/agent-docker-extension:latest
```

### 4. Test local install

Use Docker Desktop extension development tooling to install and test the image locally.

### 5. Prepare Docker listing

Required:

- Extension name
- Icon
- Screenshots
- Description
- Support URL
- Source repository
- Privacy/security notes

## Publish decision

Do not submit publicly until the app can complete this loop:

```text
User comments /agent analyze
        ↓
GitHub webhook receives event
        ↓
Agent parses command
        ↓
Agent posts a real GitHub reply
```

For Docker, do not submit publicly until:

```text
Docker Desktop opens extension
        ↓
Backend health check passes
        ↓
UI loads
        ↓
Container inspection returns a safe response
```
