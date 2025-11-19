#!/usr/bin/env node
import { readFileSync } from 'fs';
import { execSync } from 'child_process';

interface PreToolUseInput {
    session_id: string;
    tool_name: string;
    tool_input: {
        command?: string;
        [key: string]: unknown;
    };
}

async function main() {
    try {
        // Read input from stdin
        const input = readFileSync(0, 'utf-8');
        const data: PreToolUseInput = JSON.parse(input);

        // Only check Bash tool commands
        if (data.tool_name !== 'Bash') {
            process.exit(0);
        }

        const command = data.tool_input.command || '';

        // Get current branch
        let currentBranch = '';
        try {
            currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
        } catch {
            // Not in a git repo or git not available
            process.exit(0);
        }

        // Check for merge to develop/main without --no-ff
        if (command.includes('git merge')) {
            const isTargetingProtected =
                currentBranch === 'develop' ||
                currentBranch === 'main';

            const hasNoFF = command.includes('--no-ff');

            if (isTargetingProtected && !hasNoFF) {
                let output = '\n';
                output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
                output += '⛔ GIT WORKFLOW CHECK: MERGE WITHOUT --no-ff\n';
                output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
                output += `Current branch: ${currentBranch}\n`;
                output += `Command: ${command}\n\n`;
                output += '⚠️  BLOCKED: All merges to develop/main MUST use --no-ff\n\n';
                output += 'Required format:\n';
                output += '  git merge {branch} --no-ff -m "feat: ..."\n\n';
                output += '📖 See: .claude/skills/git-workflow-assistant/SKILL.md\n';
                output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

                console.log(output);
                // Exit with error to block the operation
                process.exit(1);
            }

            // Even with --no-ff, show a checklist reminder for protected branches
            if (isTargetingProtected && hasNoFF) {
                let output = '\n';
                output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
                output += '✅ GIT WORKFLOW CHECK: MERGE TO ' + currentBranch.toUpperCase() + '\n';
                output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
                output += 'Pre-merge checklist:\n';
                output += '  ✓ Using --no-ff flag\n';
                output += '  □ Commit message follows convention\n';
                output += '  □ All changes tested\n';
                output += '  □ Documentation updated\n\n';
                output += 'Proceeding with merge...\n';
                output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

                console.log(output);
            }
        }

        // Check for commits on protected branches (backup for pre-commit hook)
        if (command.includes('git commit') && !command.includes('git commit --amend')) {
            if (currentBranch === 'main' || currentBranch === 'develop') {
                let output = '\n';
                output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
                output += '⚠️  GIT WORKFLOW WARNING: COMMIT TO ' + currentBranch.toUpperCase() + '\n';
                output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
                output += 'Direct commits to ' + currentBranch + ' are discouraged.\n\n';
                output += 'Recommended workflow:\n';
                output += '  1. git checkout -b feature/phase-{N}-{description}\n';
                output += '  2. Make changes and commit there\n';
                output += '  3. Merge back with --no-ff\n\n';
                output += '📖 See: .claude/skills/git-workflow-assistant/SKILL.md\n';
                output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

                console.log(output);
                // Block commits to protected branches
                process.exit(1);
            }
        }

        process.exit(0);
    } catch (err) {
        console.error('Error in git-workflow-check hook:', err);
        process.exit(1);
    }
}

main().catch(err => {
    console.error('Uncaught error:', err);
    process.exit(1);
});
