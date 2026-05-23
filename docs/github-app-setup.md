# GitHub App Setup

This guide turns Agent Extensions into an installable GitHub App.

## Create the app

Open GitHub Developer Settings and create a new GitHub App.

Recommended name:

```text
AGenNext Agent Extension
```

Homepage URL:

```text
https://github.com/AGenNext/Agent-Extensions
```

Webhook URL:

```text
https://YOUR_HOST/webhooks/github
```

Webhook secret:

```text
Use a generated random secret and store it as GITHUB_WEBHOOK_SECRET in the hosted runtime.
```

## Repository permissions

```text
Metadata: Read-only
Contents: Read and write
Issues: Read and write
Pull requests: Read and write
Actions: Read-only
Checks: Read and write
```

## Subscribe to events

```text
issue_comment
issues
pull_request
pull_request_review
workflow_run
```

## Local runtime

```bash
pnpm install
pnpm --filter @agennext/github-app build
PORT=3000 GITHUB_WEBHOOK_SECRET=development-secret node apps/github-app/dist/server.js
```

## Test commands

Comment on an issue or pull request:

```text
/agent analyze
/agent review
/agent fix-ci
/agent merge-check
/agent explain-conflict
```

## Notes

The app should never push directly to main. Generated code changes should go through pull requests.
