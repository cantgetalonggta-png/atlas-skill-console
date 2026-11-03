# Grok Build Plugins PDF Extract

pages=12 size=277554


## Page 1

Grok  Build  Plugins:  Tools,  Locations,  
Development  Workﬂow,  and  a  Clean  
Replacement  Prompt
1. What a Grok Build plugin is
A Grok Build plugin is an installable extension package. It can bundle any combination of:
• Skills — reusable Markdown instructions and supporting resources.
• Slash commands — user-invoked workﬂows.
• Agents — specialized subagent deﬁnitions.
• Hooks — scripts or HTTP callbacks that run at lifecycle events.
• MCP servers — external tools exposed through Model Context Protocol.
• LSP servers — language-server integrations.
A plugin is an extension package, not a separate autonomous process. It is loaded by Grok 
Build and operates within the permissions, project scope, conﬁguration, and trust settings 
of that installation.
2. Tools you need and where they are
The oﬃcial documentation conﬁrms the component model and ﬁlesystem locations 
below. The original text listed commands such as plugin validate , plugin doctor , plugin 
enable , and plugin disable ; those exact plugin subcommands are not documented in the 
oﬃcial pages reviewed here. Use the TUI extension modal or the installed CLI's --help  
output to check which lifecycle commands your release supports.
Tool or resource What it is used for Where to ﬁnd or conﬁgure it
Grok Build CLI
Run interactive sessions, 
headless jobs, inspection, MCP 
management, and plugin 
workﬂows
Install from the oﬃcial Grok 
Build documentation: 
https://docs.x.ai/build/overvie
w
Grok TUI
Browse extensions, enable or 
disable available components, 
authenticate, and inspect 
loaded conﬁguration
Start with grok inside a 
project; use /plugins, /skills, 
/hooks, or /mcps


## Page 2

Project plugin directory Store plugins that belong to 
one repository <project>/.grok/plugins/
User plugin directory Store plugins for the current 
user ~/.grok/plugins/
Marketplace install directory Store marketplace-installed 
plugins ~/.grok/plugins/marketplaces/
Extra plugin paths Add other plugin roots [plugins] paths in 
~/.grok/conﬁg.toml
CLI plugin directory override Test a plugin without installing 
it globally grok --plugin-dir <PATH>
Skills directory Store reusable SKILL.md 
instructions
<project>/.grok/skills/, 
~/.grok/skills/, or an enabled 
plugin's skills/ directory
Commands directory Store slash-command 
deﬁnitions A plugin's commands/ directory
Agents directory Store subagent deﬁnitions A plugin's agents/ directory
Hooks
Run controlled checks, logging, 
formatting, or notiﬁcations at 
lifecycle events
~/.grok/hooks/, 
<project>/.grok/hooks/, or a 
plugin's hooks/ directory
MCP conﬁguration Register external tools
~/.grok/conﬁg.toml, project 
.grok/conﬁg.toml, or a plugin's 
.mcp.json
LSP conﬁguration Register language servers A plugin's .lsp.json
User conﬁguration Conﬁgure models, paths, and 
marketplace sources ~/.grok/conﬁg.toml
Marketplace source registry Record conﬁgured marketplace 
sources
~/.grok/plugins/known_marketplace
s.json and 
[[marketplace.sources]] in 
~/.grok/conﬁg.toml
Git Version a plugin, pin remote 
revisions, and submit changes
Install from https://git-
scm.com/ or use the system 
package
Python 3 Run the oﬃcial marketplace 
index and catalog validators
python3; marketplace scripts 
are in the marketplace 
repository's scripts/ directory


## Page 3

3. Install and inspect Grok Build
Follow the oﬃcial installation instructions for your operating system. After installation, 
verify the CLI and inspect a project:
Bash
grok --version
cd /path/to/your-project
grok inspect
If the executable is named grok in your release, use grok; the commands below assume 
that name. If a command diﬀers, run:
Bash
grok --help
grok plugin --help
grok mcp --help
The oﬃcial docs show these useful starting commands:
Bash
cd /path/to/your-project
grok
# or headless use:
grok -p "Explain the architecture of this repository"
On ﬁrst launch, authentication may open a browser. For non-browser environments, 
conﬁgure the API key through the environment as documented by xAI rather than hard-
coding it in a plugin repository.
Oﬃcial marketplace 
repository
Review examples, publish a 
catalog entry, and inspect 
validation rules
https://github.com/xai-
org/plugin-marketplace
Grok inspection
See discovered conﬁg, 
instructions, skills, plugins, 
hooks, and MCP servers
Run grok inspect
MCP diagnostics List, remove, or diagnose 
conﬁgured MCP servers
grok mcp list, grok mcp remove 
<name>, grok mcp doctor [name]


## Page 4

4. Minimal custom plugin layout
A small plugin can begin with only a skill:
Plain Text
my-research-plugin/
├── plugin.json              # optional metadata manifest
└── skills/
    └── research-brief/
        └── SKILL.md
A more complete plugin might look like this:
Plain Text
my-research-plugin/
├── plugin.json
├── skills/
│   └── research-brief/
│       └── SKILL.md
├── commands/
│   └── research-brief.md
├── agents/
│   └── source-reviewer.md
├── hooks/
│   └── hooks.json
├── .mcp.json
└── .lsp.json
The plugin may contain only the components it actually needs. Avoid adding hooks, 
network services, or credentials unless they are necessary and clearly documented.
5. Example plugin.json
The manifest is optional, but it is useful for metadata and explicit component paths:
JSON
{
  "name": "my-research-plugin",
  "description": "A source-reviewing workflow for clear, evidence-based research
  "version": "0.1.0",
  "author": "Example Author",


## Page 5

  "license": "MIT"
}
Keep the identiﬁer stable and use a simple kebab-case name. Match the directory name 
and marketplace entry where practical.
6. Example skill
Create skills/research-brief/SKILL.md:
Markdown
---
name: research-brief
description: Build a concise, source-aware research brief from public materials
when-to-use: Use when the user asks for a researched explanation, comparison, o
user-invocable: true
argument-hint: [topic]
---
# Research brief
1. Clarify the question and define the scope.
2. Prefer official records, primary documents, and peer-reviewed sources.
3. Use secondary reporting only for context and identify it as such.
4. Separate established facts, reported claims, interpretations, and open questi
5. Record the source title, publisher, date, URL, and relevant limitation.
6. Compare independent sources before drawing a conclusion.
7. Write in plain language with short examples where they improve understanding
8. Do not claim to have accessed sources that were unavailable or not reviewed.
9. Protect personal information and do not seek private data that is not necessa
The SKILL.md frontmatter supports ﬁelds such as name, description, when-to-use, paths, 
allowed-tools, argument-hint, user-invocable, and disable-model-invocation. The oﬃcial 
documentation notes that allowed-tools describes tool metadata; it is not a substitute for 
the platform's permission system.
7. Example slash command
Create commands/research-brief.md:
Markdown
---
name: research-brief


## Page 6

description: Produce a structured, source-aware research brief.
argument-hint: [topic]
---
Prepare a research brief on: $ARGUMENTS
Use this structure:
1. Question and scope
2. Key findings
3. Evidence and source table
4. Areas of agreement and disagreement
5. Uncertainties and limitations
6. Plain-language conclusion
Use only sources that are available in the current session. Cite URLs when possi
The exact argument interpolation syntax can vary by command format and release. 
Conﬁrm the supported syntax with a built-in example or grok --help before publishing a 
command.
8. Example agent deﬁnition
Create agents/source-reviewer.md with a focused role:
Markdown
---
name: source-reviewer
description: Check citations, source quality, and uncertainty in a research brie
---
Review the supplied draft. Return:
- unsupported or weakly supported claims;
- missing citations;
- conflicts between sources;
- statements that should be marked as uncertain;
- a short list of concrete corrections.
Do not invent sources or imply that a source was reviewed if it was not availab
Keep agents narrow. A specialized reviewer is easier to test than a general-purpose 
instruction set that attempts to control every future conversation.


## Page 7

9. Example hook
Hooks can run a command or call an HTTP endpoint at lifecycle events. Project hooks 
require trust before they run. A conservative example is a logging hook:
JSON
{
  "hooks": {
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bin/log-tool-use.sh",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
Hook scripts receive event JSON on standard input. Plugin hooks also receive 
GROK_PLUGIN_ROOT and GROK_PLUGIN_DATA. Keep hooks short, transparent, and narrowly 
scoped. Test failure behavior before enabling a hook in a shared repository.
10. Example MCP integration
MCP servers expose external tools to Grok. A local server can be conﬁgured with the CLI:
Bash
grok mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/
grok mcp list
grok mcp doctor filesystem
For project scope:
Bash
grok mcp add --scope project filesystem -- npx -y @modelcontextprotocol/server-f
A plugin can declare MCP conﬁguration in .mcp.json, but do not place secrets directly in the 
ﬁle. Use environment-variable expansion and document the required variables. Review 


## Page 8

every server's code, permissions, network access, and data handling before installation.
11. Test a plugin locally
From the plugin directory or a test repository:
Bash
# Inspect the plugin without putting it into a marketplace
grok --plugin-dir /absolute/path/to/my-research-plugin inspect
# Start a test session with the plugin
grok --plugin-dir /absolute/path/to/my-research-plugin
Then check:
• Does the plugin appear in grok inspect?
• Does the skill appear under /skills or as a slash command?
• Does the command produce the expected structure?
• Are paths and environment variables portable?
• Do hooks run only on the intended events?
• Does the plugin work with no unnecessary network access?
• Are errors clear and reversible?
Use a disposable test repository when testing hooks, MCP servers, or ﬁle-writing behavior.
12. Publish through the oﬃcial marketplace
The oﬃcial marketplace repository uses:
Plain Text
.grok-plugin/marketplace.json    # catalog source of truth
.grok-plugin/plugin-index.json   # generated component index
plugins/                         # first-party plugins
external_plugins/                # third-party plugins
scripts/                         # validation and index-generation scripts
For a remote plugin, add a catalog entry with a full 40-character commit SHA:
JSON


## Page 9

{
  "name": "my-research-plugin",
  "description": "Evidence-based research brief workflow",
  "category": "development",
  "source": {
    "source": "url",
    "url": "https://github.com/example/my-research-plugin.git",
    "sha": "0000000000000000000000000000000000000000"
  },
  "homepage": "https://github.com/example/my-research-plugin",
  "keywords": ["research", "citations", "brief"]
}
Obtain the real commit SHA with:
Bash
git ls-remote https://github.com/example/my-research-plugin.git HEAD
Then, in a clone of the marketplace repository:
Bash
python3 scripts/generate-plugin-index.py
python3 scripts/validate-catalog.py
python3 scripts/generate-plugin-index.py --check
Open a pull request with the catalog and generated index changes. Remote sources should 
remain pinned so an update is intentional and reviewable.
13. Marketplace installation and supported management 
paths
The oﬃcial announcement documents marketplace installation through the TUI and the 
terminal:
Plain Text
/marketplace
Inside the marketplace tab, select a plugin and install it. The announcement also shows:
Bash


## Page 10

grok plugin marketplace list
grok plugin install <name> --trust
For your installed release, verify the exact command syntax with:
Bash
grok plugin --help
grok plugin marketplace --help
grok plugin install --help
The TUI extensions modal is opened with /plugins, /hooks, /skills, or /mcps. grok inspect 
is the best ﬁrst diagnostic because it reports discovered conﬁguration and extension 
sources.
14. Design and safety checklist
• Give the plugin a narrow purpose and a clear description.
• Use public, lawful, and accessible sources; do not assume access to restricted material.
• Distinguish facts, claims, interpretations, and uncertainty.
• Do not collect unnecessary personal or conﬁdential information.
• Do not embed API keys, tokens, or private credentials in the repository.
• Pin remote marketplace revisions to a full commit SHA.
• Review third-party code before installation.
• Make ﬁle writes, network calls, and hooks explicit.
• Use test repositories and least-privilege directories.
• Keep output length proportional to the user's request instead of forcing a ﬁxed 
minimum.
• Allow the user to pause, redirect, or end a task naturally.
• Avoid partisan assumptions; represent relevant evidence and competing 
interpretations fairly.
15. Clean replacement prompt
The following is a direct replacement for the attached text. It preserves the useful goals—
structured research, plain-language explanations, source comparison, continuity, and a 


## Page 11

distinctive voice—while removing coercive control language, unsupported access claims, 
profanity, ﬁxed-length requirements, and instructions to ignore permissions.
Plain Text
You are a clear, rigorous research and writing assistant named Northstar.
Purpose
-------
Help the user investigate topics, understand complex material, compare sources, 
Research method
---------------
1. Clarify the question, intended audience, scope, and time period.
2. Start with official records, primary documents, public datasets, and reputab
3. Use secondary reporting for context and identify it as secondary reporting.
4. Compare independent sources and note meaningful differences in evidence, date
5. Separate:
   - established facts;
   - attributed claims;
   - reasonable inferences;
   - unresolved questions.
6. Record source titles, publishers, dates, URLs, and material limitations when 
7. Be transparent about sources that are unavailable, paywalled, outdated, incom
8. Respect access controls, privacy, copyright, and applicable law. Do not seek 
9. Never claim to have searched a site, database, or document unless it was actu
Writing style
------------
- Use plain, direct language.
- Organize long answers with descriptive headings, bullets, and tables when help
- Explain specialized terms the first time they appear.
- Use short examples or analogies when they improve understanding.
- Keep the tone confident but not theatrical, insulting, or demeaning.
- Avoid partisan framing unless the user specifically asks for an analysis of pa
- Match the requested level of detail rather than using a mandatory word count.
Quality control
---------------
Before answering, check:
- Did I answer the actual question?
- Are important claims supported or clearly attributed?
- Did I distinguish evidence from interpretation?
- Did I identify uncertainty and limitations?
- Did I avoid inventing sources, quotations, tools, or results?
- Did I protect private information?
Continuity


## Page 12

----------
If the user says “continue” or “next,” resume from the last unfinished section, 
Response format for a research brief
------------------------------------
1. Scope and question
2. Executive summary
3. Key evidence
4. Source comparison
5. Limitations and uncertainty
6. Practical implications
7. Conclusion
8. Sources, when available
You may use the name Northstar in the opening line when the user asks for a pers
Sources
• Grok Build overview
• Skills, Plugins & Marketplaces
• MCP Servers
• Hooks
• Oﬃcial Grok Build Plugin Marketplace announcement
• Oﬃcial marketplace repository
