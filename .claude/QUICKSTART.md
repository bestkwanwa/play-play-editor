# Claude Code 快速入门

欢迎使用配置了最佳实践的 play-play-editor 项目！

## 立即验证设置

### 1. 测试技能自动激活

尝试询问：
```
"如何创建一个新的技能？"
```

应该会自动触发 `skill-developer` 技能。

### 2. 使用代理

测试一个代理：
```
使用 plan-reviewer 代理帮我审查开发计划
```

### 3. 创建开发文档

使用斜杠命令：
```
/dev-docs editor-architecture
```

这会在 `dev/active/editor-architecture/` 下创建三个文件：
- `editor-architecture-plan.md` - 战略计划
- `editor-architecture-context.md` - 关键上下文
- `editor-architecture-tasks.md` - 任务清单

## 已安装的组件

### Hooks（自动化）
- ✅ `skill-activation-prompt` - 自动建议相关技能
- ✅ `post-tool-use-tracker` - 跟踪文件变更

### Skills（知识库）
- ✅ `skill-developer` - 技能系统开发 meta-skill

### Agents（专业助手）
- ✅ `code-architecture-reviewer` - 架构审查
- ✅ `code-refactor-master` - 代码重构
- ✅ `documentation-architect` - 文档生成
- ✅ `plan-reviewer` - 计划审查
- ✅ `refactor-planner` - 重构规划
- ✅ `web-research-specialist` - 网络研究

### Commands（快捷命令）
- ✅ `/dev-docs` - 创建开发文档
- ✅ `/dev-docs-update` - 更新开发文档

## 下一步行动

### 1. 定义编辑器架构

一旦你决定了编辑器的核心架构，创建自定义技能：

```
我想为我的编辑器创建一个技能，用于强制执行以下模式：
- Canvas 操作的最佳实践
- 状态管理模式
- React 组件结构
```

### 2. 开始开发

使用 `/dev-docs` 命令创建你的第一个功能计划：

```
/dev-docs canvas-rendering-system
```

### 3. 跨会话工作

当上下文重置前，更新进度：

```
/dev-docs-update
```

下次恢复时，只需读取 `dev/active/` 下的文档即可。

## 故障排除

### Hooks 不工作？

```bash
# 确保脚本可执行
chmod +x .claude/hooks/*.sh

# 检查依赖
cd .claude/hooks && npm list
```

### 技能不激活？

检查 `.claude/skills/skill-rules.json` 的触发模式是否匹配你的提示。

### 想要添加更多组件？

查看 showcase 项目：
```
/Users/elvis/Github/claude-workspace/claude-code-infrastructure-showcase
```

## 技能触发示例

试试这些短语来测试技能激活：

| 短语 | 预期技能 |
|------|---------|
| "如何创建技能？" | skill-developer |
| "技能系统是如何工作的？" | skill-developer |
| "添加新的 skill rules" | skill-developer |

## 配置文件位置

- **Hooks 配置**: `.claude/settings.json`
- **技能触发器**: `.claude/skills/skill-rules.json`
- **Hook 依赖**: `.claude/hooks/package.json`

## 资源链接

- [完整文档](.claude/README.md)
- [Skill Developer 技能](.claude/skills/skill-developer/SKILL.md)
- [Claude Code 官方文档](https://docs.claude.com/claude-code)

---

**提示**：这个配置来自 6 个月生产环境验证的最佳实践。随着你的项目发展，不断调整技能规则以匹配你的工作流程。
