# Contributing Guide

## 🚀 Getting Started with Claude Code

本项目使用 **Claude Code** 进行开发，并采用特定的工作流程来保持团队协作的一致性。

### 首次设置

1. **确保 Claude Code 已安装并配置**

   ```bash
   # 项目已包含 .claude/ 配置，重启 Claude Code 即可加载
   ```

2. **阅读配置文档**
   - `dev/DEV_DIRECTORY_RULES.md` - **必读**：dev/ 目录结构规范
   - `dev/learning/` - 了解 session 管理策略
   - `dev/learning/git-workflow/` - Git Flow + Phase 命名规范
   - `.claude/skills/` - 了解可用的技能系统
   - `.claude/commands/` - 了解可用的命令

3. **创建个人会话笔记**（可选）
   ```bash
   # dev/NEXT_SESSION.md 是你的个人笔记（不提交到 Git）
   # 每次 session 开始前，记录你的计划
   cp dev/NEXT_SESSION.template.md dev/NEXT_SESSION.md
   ```

---

## 📋 工作流程

### Session 开始

1. **检查项目待办** - 阅读 `dev/TODO.md` 了解当前任务
2. **准备个人计划**（可选） - 在 `dev/NEXT_SESSION.md` 记录本次 session 计划
3. **开始对话** - 告诉 Claude 你要做什么

### 功能开发

1. **规划阶段** - 使用 `/dev-docs <feature-name>` 创建详细规划
   - Claude 会自动将任务同步到 `dev/TODO.md`
   - Dev Docs 会保存到 `dev/docs/<feature-name>.md`

2. **实现阶段** - 按照规划逐步实现
   - Claude 会使用 `TodoWrite` 工具跟踪进度（session 内可见）
   - 完成后 Claude 会自动更新 `dev/TODO.md`（跨 session 可见）

3. **提交代码**
   ```bash
   # Claude 会帮你提交，同时会包含更新后的 dev/TODO.md
   git add .
   git commit -m "feat: implement xxx"
   ```

### Session 结束

1. **更新 Dev Docs**（如果需要）
   - 使用 `/dev-docs-update` 更新规划文档

2. **保存重要讨论**（可选）
   - 使用 `/save-qa -3 -1 topic-name` 保存有价值的对话

3. **准备下次 Session**（可选）
   - 更新你的 `dev/NEXT_SESSION.md`

---

## 🗂️ 文件组织

### Git 管理的文件

```
dev/
├── TODO.md                   # ✅ 项目待办（Claude 自动更新）
├── CONTRIBUTING.md           # ✅ 本文档
├── DEV_DIRECTORY_RULES.md    # ✅ 目录结构规范（定义允许的文件类型）
├── learning/                 # ✅ 通用知识库
│   ├── git-workflow/        # ✅ Git 工作流程文档
│   └── [topic]/             # ✅ Q&A 会话、教程
└── active/                   # ✅ Dev Docs 规划文档（功能特定）
    └── [feature]/           # ✅ 由 /dev-docs 创建
```

**重要**: 关于 dev/ 目录下可以创建什么文件，请参考 `dev/DEV_DIRECTORY_RULES.md`

### 不提交的文件（个人使用）

```
dev/
└── NEXT_SESSION.md      # ❌ 你的个人会话笔记
```

已在 `.gitignore` 中排除：

```gitignore
dev/NEXT_SESSION.md
```

---

## 🤖 Claude Code 工作约定

### TODO.md 自动更新规则

**Claude Code 会自动维护 `dev/TODO.md`**：

1. **创建任务** - 当执行 `/dev-docs` 时
   - 从规划文档提取任务列表
   - 自动添加到 TODO.md

2. **更新进度** - 当完成功能时
   - 标记相关任务为已完成 `[x]`
   - 提交时包含 TODO.md 更新

3. **保持同步** - 与 `dev/docs/` 双向同步
   - Dev Docs 是详细规划
   - TODO.md 是简洁的任务追踪

### 成员职责

**你不需要手动编辑 `dev/TODO.md`**，但应该：

✅ **应该做的**：

- 告诉 Claude 你完成了什么功能
- 使用 `/dev-docs` 创建规划
- 查看 TODO.md 了解项目进度
- 提交代码时包含 Claude 更新的 TODO.md

❌ **避免做的**：

- 手动编辑 TODO.md（让 Claude 维护）
- 提交 `dev/NEXT_SESSION.md`（个人文件）
- 跳过 `/dev-docs` 直接写代码（复杂功能）

---

## 📚 常用命令速查

| 命令                           | 用途           | 示例                              |
| ------------------------------ | -------------- | --------------------------------- |
| `/dev-docs <topic>`            | 创建功能规划   | `/dev-docs user-authentication`   |
| `/dev-docs-update`             | 更新现有规划   | `/dev-docs-update`                |
| `/save-qa <positions> [topic]` | 保存对话为知识 | `/save-qa -3 -1 state-management` |

---

## 🎯 最佳实践

### Session 管理

- **相关工作 → 继续同一个 session**
  - 例：实现同一功能的多个组件

- **不相关工作 → 新建 session**
  - 例：从前端开发切换到部署配置

- **Session 过长 → 先更新 Dev Docs 再新建**
  - 使用 `/dev-docs-update` 保存进度

### 知识积累

- **遇到重要架构决策** → 使用 `/save-qa` 保存
- **学到新的模式** → 保存到 `dev/learning/`
- **形成团队规范** → 创建对应的 Skill

---

## 🔄 多人协作

### 拉取代码后

```bash
git pull origin main
# 检查 dev/TODO.md 看看团队进度
# 检查 dev/docs/ 看看新的规划
```

### 合并冲突处理

**TODO.md 冲突**：

- 通常是勾选框冲突
- 保留所有已完成的任务（合并两边的 `[x]`）
- 询问 Claude 帮你解决冲突

**Dev Docs 冲突**：

- 少见（通常不同人写不同功能的 docs）
- 如果发生，使用 Claude 合并内容

---

## 💡 提示

- `.claude/` 目录包含项目的 Claude Code 配置
- Hooks 会在特定时机自动运行（例如提示使用 Skills）
- Skills 会在相关话题时自动激活
- 所有这些都是为了让开发更高效、更一致

## 📖 文档快速导航

| 文档                         | 用途                                  |
| ---------------------------- | ------------------------------------- |
| `dev/DEV_DIRECTORY_RULES.md` | dev/ 目录结构规范（什么文件可以创建） |
| `dev/TODO.md`                | 项目任务追踪（当前进度）              |
| `dev/CONTRIBUTING.md`        | 本文档（工作流程）                    |
| `dev/learning/git-workflow/` | Git Flow + Phase 命名规范             |
| `dev/learning/`              | 通用知识库（Q&A、教程）               |
| `dev/active/`                | 功能规划文档（由 /dev-docs 创建）     |

有问题？查看上述文档或询问 Claude！
