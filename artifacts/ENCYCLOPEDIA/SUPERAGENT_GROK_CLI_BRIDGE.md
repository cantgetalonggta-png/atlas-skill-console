# superagent-ai / grok-cli bridge notes
2026-11-03T05:38:37.907261Z

## Identity
- Community project: https://github.com/superagent-ai/grok-cli
- Not affiliated with xAI Corp.
- MIT · TypeScript · Bun · OpenTUI
- Stars ~3.5k · forks ~427 (as of Drive capture 2026-10-28)

## Install
```bash
curl -fsSL https://raw.githubusercontent.com/superagent-ai/grok-cli/main/install.sh | bash
# or
bun add -g grok-dev
```

## Runtime
- `grok` interactive TUI
- `grok --prompt "..."` headless
- `grok --batch-api` unattended lower cost
- `grok daemon --background` schedules
- Telegram remote control + STT via xAI /v1/stt

## Relation to this workspace
- Distinct from xAI Grok Build harness / plugin marketplace.
- Useful as external coding agent against same GROK_API_KEY.
- Skills under .agents/skills/ vs Grok Build skills/.
- Documented for multi-engine background tasks; do not confuse installers.
