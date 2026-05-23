# Puter Runtime

Puter.js is the preferred runtime and userland surface for Agent Extensions.

## Role

The Puter runtime should own:

- Agent control panel
- Slash command UX
- Graph and compliance views
- Memory views
- Runtime status views
- Human approval flows
- Extension settings

## Relationship to backend

```text
Puter.js runtime
  → AGenNext backend/database
  → GitHub/Docker bridge services
```

The backend/database remains the source of truth.

## Relationship to Node bridge

Node bridge code is preserved for GitHub webhook compatibility. Do not delete it until Puter.js or the backend fully owns secure webhook ingestion.

## Initial modules

```text
src/
  app.js
  commands.js
  graph.js
  backend.js
  approvals.js
```
