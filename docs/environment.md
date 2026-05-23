# Environment Variables

## GitHub App runtime

```text
PORT=3000
GITHUB_WEBHOOK_SECRET=replace-me
GITHUB_TOKEN=replace-me
```

## Optional LLM configuration

```text
OPENAI_API_KEY=replace-me
AGENT_LLM_PROVIDER=openai
```

## Notes

- `GITHUB_WEBHOOK_SECRET` must match the GitHub App webhook secret.
- `GITHUB_TOKEN` should allow issue and pull request comment publishing.
- The runtime should never expose secrets in generated responses.
