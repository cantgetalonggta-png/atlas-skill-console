# atlas.deploymentPackage.v1

## Purpose
A structured export any implementer LLM can consume without guessing what was selected.

## How to build
1. Open Atlas **Selector**.
2. Load a preset or toggle items.
3. Copy / Download / `POST /api/package` with `{ "ids": [...], "name?", "description?" }`.

## Schema fields
- `schema`: always `atlas.deploymentPackage.v1`
- `implementer.rules` / `steps`: constraints and ordered work
- `modules.*`: name lists by bucket (live/workspace/inventory skills, plugins, tools, …)
- `items[]`: each selected node with `implement` instruction
- `routes` / `verification`: what to hit after implementing

## Status truth
| status | meaning |
|--------|---------|
| live | Installed under server-skills; safe to invoke |
| workspace | App-builder skill under `.grok/skills` |
| inventory | Named in MASTER_SKILLS only — research/install first |
| plugin | Local pack catalog entry |
| tool / connector / mode / service / artifact | As labeled |

## Endpoints
- `GET /api/inventory` — full tree + items
- `GET /api/package` — usage example
- `POST /api/package` — build package from ids
