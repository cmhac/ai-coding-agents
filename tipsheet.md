# AI Coding Agents Tipsheet

A quick reference guide for working effectively with AI coding agents.

## Configuration Tools

### AGENTS.md

Create an `AGENTS.md` file in your project root to provide persistent context:

- Project structure and organization
- Technology stack (package managers, frameworks, workflow tools)
- Critical constraints and preferences
- Standard commands and procedures

Works across platforms: GitHub Copilot, Cursor, Codex, etc.

### Skills

[Skills](https://agentskills.io/home) provide task-specific instructions and tool sets for different scenarios beyond project-level guidance. Skills let you customize agent behavior for specialized tasks like documentation maintenance, testing workflows, or domain-specific operations.

### MCP Servers

[Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro) servers give agents access to external tools and data. Some useful MCP servers for coding agents include:

- [**Context7**](https://context7.com/): Documentation lookup for popular libraries
- [**Playwright**](https://github.com/microsoft/playwright-mcp): Browser automation for frontend testing and validation
- [**GitHub MCP Server**](https://github.com/github/github-mcp-server): Access to repository code, issues, pull requests, and more.

## Best Practices for Agent Interaction

### Be Explicit and Directive

❌ "My API call to fetch data from the server is failing. Can you help?"
✅ "The file `dataFetcher.js` contains a function `fetchData()`. It throws a 500 error when called. Run the command `node dataFetcher.js` to reproduce. Fix the function to handle server errors gracefully by retrying up to 3 times with exponential backoff using the `axios-retry` library."

- Give clear directives, not just problem descriptions
- Explain your intent and provide context
- Where possible, describe how code should be written, not just the goal

### Communicate Uncertainty

Tell the agent when you want it to be cautious: "I'm not sure about the best approach for X, let's think it through." Otherwise, agents will charge ahead confidently.

### Provide Inputs AND Outputs

Give agents the tools to verify their work:

- **Unit tests**: Let agents generate and run tests to validate functionality
- **Validation checks**: For data science, ensure data looks as expected
- **Browser tools**: Use MCP servers like Playwright for frontend verification

For more, see the [Set Guardrails](#set-guardrails) section below.

### Debug Iteratively

When issues arise, guide agents through debugging:

- Ask for progressively detailed debug logging
- Request small test cases for specific scenarios
- Let the agent add temporary logs, run code, and review outputs

## Set Guardrails

Configure automated checks to enforce standards, and give the agents the ability and instructions to run them, view results, and fix issues.

### Pre-commit Hooks

Pre-commit hooks are code quality checks that run automatically before code is committed to prevent unreadable or broken code from entering the codebase. They also provide a suite of checks that agents can use to validate their changes.

There are several ways to set up pre-commit hooks; I recommend either:

- [pre-commit](https://pre-commit.com/) (Python-based, but works with any language)
- [Husky](https://typicode.github.io/husky/#/) (JavaScript/Node.js-based)

### Tell Agents to Run Checks

Add instructions to your `AGENTS.md`. For example, if you're using `pre-commit`, you might add:

```markdown
## Code Quality

After modifying code, run `pre-commit run --files <modified files>`
to check code quality before stopping.
```

## Pitfalls to Avoid

### Watch for Reward Hacking

Agents aim to fulfill requests but might take shortcuts:

- "Make all tests pass" → might disable tests instead of fixing bugs
- Be specific about what proper fixes look like
- Focus on fixing root causes, not just metrics
- Always inspect what the agent actually did

### Unnecessary "Backwards Compatibility" Maintenance

For large changes, explicitly tell agents not to preserve old behavior unnecessarily. They often default to maintaining compatibility when you don't need it.

### Start Fresh Often

Create new conversations frequently to keep context fresh and avoid [Context rot](https://github.com/chroma-core/context-rot).

## Further reading

- To learn more about AGENTS.md, see the [official documentation](https://agents.md/).
- To learn more about Skills, visit the [Skills website](https://agentskills.io/home).
- To learn more about MCP servers, visit the [Model Context Protocol website](https://modelcontextprotocol.io/docs/getting-started/intro).
- For setting up custom instructions in GitHub Copilot in VS Code, see [Adding Repository Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions?tool=vscode).
- For setting up skills in GitHub Copilot, see [Using Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills).
- For setting up MCP servers in GitHub Copilot, see [Using Model Context Protocol (MCP) Servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).
