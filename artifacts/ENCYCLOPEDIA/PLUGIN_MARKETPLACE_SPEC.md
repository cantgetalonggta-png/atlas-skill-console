# Plugin Marketplace Spec (Archivist Batch 2)
2026-11-03T05:34:33.264553Z

## Layout
skills/ · commands/ · agents/ · hooks/*.json · .mcp.json · .lsp.json · plugin.json

## Hooks (official)
Events: SessionStart, SessionEnd, UserPromptSubmit, PreToolUse (blocking), PostToolUse, PostToolUseFailure, Stop, SubagentStart, SubagentStop, Notification
Format: Claude-compatible hooks object; PreToolUse decision allow/deny; exit 2 denies; fail-open on timeout.

## Marketplace remote SHA
40-char lowercase commit; git rev-parse HEAD == sha at install.

## Docs
https://x.ai/docs/build/features/skills-plugins-marketplaces
https://github.com/xai-org/plugin-marketplace
