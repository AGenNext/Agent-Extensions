# AGenNext Agent Extensions — Alpha Deployment

## Goal
Deploy the minimum operational runtime required to test:

```text
/agent analyze
```

through a real GitHub issue comment.

---

# Runtime topology

```text
GitHub webhook
  → github-app bridge
  → backend runtime
  → persistence/audit
  → GitHub reply comment
```

---

# Requirements

- Docker
- Docker Compose
- GitHub App
- GitHub webhook configuration
- GitHub token or installation-token flow

---

# Environment setup

Copy:

```bash
cp .env.alpha.example .env
```

Update:

```text
GITHUB_WEBHOOK_SECRET
GITHUB_TOKEN
```

---

# Start runtime

```bash
docker compose -f docker-compose.alpha.yml up --build
```

Expected services:

```text
backend      :3100
github-app   :3000
```

---

# Health checks

Backend:

```bash
curl http://localhost:3100/health
```

Expected:

```json
{
  "ok": true
}
```

---

# GitHub App setup

Configure webhook URL:

```text
https://YOUR_HOST/webhook
```

Configure webhook secret:

```text
same value as GITHUB_WEBHOOK_SECRET
```

Required permissions:

```text
Issues: Read/Write
Pull Requests: Read/Write
Contents: Read
Metadata: Read
```

Events:

```text
Issue comments
Pull requests
```

---

# Operational alpha test

Comment on a GitHub issue:

```text
/agent analyze
```

Expected flow:

```text
GitHub webhook
→ command parser
→ policy engine
→ backend persistence
→ GitHub reply comment
→ audit log
```

Verify:

```bash
curl http://localhost:3100/commands
curl http://localhost:3100/audit/logs
```

---

# Runtime guarantees

- No silent failures
- Prefer partial success over hard failure
- Generated changes go through PRs only
- Policy gates destructive actions
- Backend/database is source of truth
- Schema graph is compliance truth

---

# Current limitations

```text
In-memory persistence only
No real database adapter yet
Puter dashboard not wired to live backend yet
Marketplace publishing not complete
```
