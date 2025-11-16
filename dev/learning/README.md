# Learning Documentation

这个目录用于保存与 Claude Code 的学习对话和技术讨论。

## 目录结构

```
learning/
├── README.md                    # 本文件
├── git-workflow/               # Git Flow + Phase 命名规范
│   ├── GIT_WORKFLOW.md        # 完整 Git 工作流程指南
│   └── GIT_WORKFLOW_QUICK_REF.md  # 快速参考
├── [topic-name]/               # 按主题组织
│   ├── qa-YYYY-MM-DD.md       # Q&A 会话记录
│   ├── summary.md             # 主题总结
│   └── examples/              # 代码示例
└── index.md                    # 所有主题索引
```

## 如何保存对话

### 方法 1：使用斜杠命令（最快）

```
/save-qa [主题名]
```

示例：

```
/save-qa claude-code-setup
/save-qa skill-system
/save-qa canvas-rendering
```

### 方法 2：使用 Agent（最详细）

```
使用 documentation-architect 代理为今天的对话创建学习文档
```

### 方法 3：手动创建

按照 `learning-documentation` skill 中的模板创建文档。

## 文档命名规范

- **Q&A 会话**: `qa-YYYY-MM-DD.md` 或 `qa-001.md`
- **主题总结**: `[topic]-summary.md`
- **深度探讨**: `[topic]-deep-dive.md`
- **代码示例**: `examples/[name].tsx`

## 已保存的主题

### git-workflow

- **完整指南**: `git-workflow/GIT_WORKFLOW.md`
- **快速参考**: `git-workflow/GIT_WORKFLOW_QUICK_REF.md`
- **说明**: Git Flow + Phase 命名策略，由 git-workflow-assistant skill 自动执行

<!-- 在这里列出其他已保存的主题 -->

---

**提示**: 在重要对话后使用 `/save-qa` 快速保存，防止知识丢失！
