# Deployment Guide

The GitHub App runtime can be hosted on:

- Fly.io
- Railway
- Render
- Cloudflare Workers
- Vercel
- Kubernetes
- Docker

## Minimal environment variables

```text
PORT=3000
GITHUB_WEBHOOK_SECRET=replace-me
```

## Example Docker run

```bash
docker build -t agennext-agent-extension .

docker run \
  -p 3000:3000 \
  -e PORT=3000 \
  -e GITHUB_WEBHOOK_SECRET=replace-me \
  agennext-agent-extension
```

## Example Fly.io deployment

```bash
fly launch
fly deploy
```

## Example Railway deployment

```text
1. Connect GitHub repository
2. Set environment variables
3. Deploy
```

## Webhook routing

The hosted runtime should expose:

```text
POST /webhooks/github
```

GitHub App webhooks should point to:

```text
https://YOUR_HOST/webhooks/github
```
