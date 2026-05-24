# Installation Guide

## Alpha runtime setup

### Clone repository

```bash
git clone https://github.com/AGenNext/Agent-Extensions.git
cd Agent-Extensions
```

## Configure environment

```bash
cp .env.alpha.example .env
```

Update:

```text
GITHUB_WEBHOOK_SECRET
GITHUB_TOKEN
```

## Start runtime

```bash
docker compose -f docker-compose.alpha.yml up --build
```

## Runtime topology

```text
GitHub webhook
  → github-app bridge
  → backend runtime
  → persistence/audit
  → GitHub reply
```

## Backend verification

```bash
curl http://localhost:3100/health
```

## GitHub App setup

Required permissions:

```text
Issues: Read/Write
Pull Requests: Read/Write
Contents: Read
Metadata: Read
```

Required events:

```text
Issue comments
Pull requests
```

## Alpha validation

Comment:

```text
/agent analyze
```

Expected behavior:

```text
GitHub reply comment
backend persistence
command audit log
```

## Current limitations

```text
In-memory persistence only
No production deployment yet
Docker Desktop verification incomplete
Puter dashboard still scaffolded
```
