# Claude Code Configuration

这个项目已经配置了 Claude Code 的最佳实践，包括技能自动激活、代理和开发文档模式。

## 目录结构

```
.claude/
├── hooks/                    # 自动化 hooks
│   ├── skill-activation-prompt.sh/.ts  # 技能自动激活
│   ├── post-tool-use-tracker.sh        # 文件变更跟踪
│   ├── package.json                    # TypeScript 依赖
│   └── tsconfig.json
├── skills/                   # 知识库技能
│   ├── skill-developer/     # 技能开发 meta-skill
│   └── skill-rules.json     # 技能触发配置
├── agents/                   # 专业代理
│   ├── code-architecture-reviewer.md
│   ├── code-refactor-master.md
│   ├── documentation-architect.md
│   ├── plan-reviewer.md
│   ├── refactor-planner.md
│   └── web-research-specialist.md
├── commands/                 # 斜杠命令
│   ├── dev-docs.md          # 创建开发文档
│   └── dev-docs-update.md   # 更新开发文档
└── settings.json            # Claude Code 配置
```

## 核心功能

### 1. 技能自动激活

当你编写代码或提问时，相关的技能会自动激活并提供建议。

**工作原理**：
- `skill-activation-prompt` hook 分析你的提示关键词
- `post-tool-use-tracker` hook 跟踪文件变更
- `skill-rules.json` 定义触发模式

**当前技能**：
- `skill-developer` - 帮助创建新的 Claude Code 技能

### 2. 代理（Agents）

使用 Task 工具调用专业代理来处理复杂任务：

- **code-architecture-reviewer** - 审查代码架构一致性
- **code-refactor-master** - 执行大型重构
- **documentation-architect** - 创建全面的文档
- **plan-reviewer** - 在实施前审查计划
- **refactor-planner** - 创建重构策略
- **web-research-specialist** - 在线研究技术问题

### 3. 开发文档模式

用于跨上下文重置保持进度。

**命令**：
- `/dev-docs [任务名]` - 创建战略计划和任务清单
- `/dev-docs-update` - 在上下文重置前更新进度

**输出**：
```
dev/active/[task-name]/
├── [task-name]-plan.md      # 战略计划
├── [task-name]-context.md   # 关键决策和文件
└── [task-name]-tasks.md     # 任务清单
```

## 下一步

### 为你的编辑器创建自定义技能

随着编辑器架构的明确，考虑创建针对以下方面的技能：

1. **编辑器核心模式** - Canvas 操作、渲染管线、状态管理
2. **组件架构** - 编辑器特定的 React 组件模式
3. **性能优化** - 编辑器性能最佳实践
4. **测试策略** - 编辑器功能的测试方法

使用 `skill-developer` 技能来指导创建这些自定义技能。

### 添加项目特定的 Agents

根据你的编辑器需求，可以创建专门的 agents：
- 编辑器性能分析器
- Canvas 调试助手
- 组件测试生成器

## 技能开发

要创建新技能：

1. 询问关于技能系统的问题（会自动触发 `skill-developer`）
2. 按照指导创建技能结构
3. 更新 `skill-rules.json` 添加触发规则
4. 测试技能激活

## 维护

- **Hook 依赖更新**：`cd .claude/hooks && npm update`
- **验证配置**：确保 `settings.json` 和 `skill-rules.json` 是有效的 JSON
- **Hook 权限**：如果 hooks 不工作，运行 `chmod +x .claude/hooks/*.sh`

## 资源

- [Claude Code 文档](https://docs.claude.com/claude-code)
- [技能系统文档](.claude/skills/skill-developer/SKILL.md)
- [Showcase 项目](../claude-code-infrastructure-showcase/)
