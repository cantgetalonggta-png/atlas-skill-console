# Hooks Spec
2026-11-03T05:34:33.264553Z
- Paths: ~/.grok/hooks/*.json and project .grok/hooks/*.json
- PreToolUse only blocking event; stdout {"decision":"deny","reason":"..."} or exit 2
- Env: GROK_HOOK_EVENT, GROK_SESSION_ID, GROK_WORKSPACE_ROOT; plugins get GROK_PLUGIN_ROOT
- Project hooks require /hooks-trust
