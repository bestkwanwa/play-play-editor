# Play-Play-Editor Claude Code 项目结构

## 完整目录树

```
play-play-editor/
├── .claude/
│   ├── hooks/                           # 自动化 hooks
│   │   ├── skill-activation-prompt.sh   # Shell wrapper
│   │   ├── skill-activation-prompt.ts   # 技能激活逻辑
│   │   ├── post-tool-use-tracker.sh     # 文件变更跟踪
│   │   ├── package.json                 # TypeScript 依赖
│   │   ├── tsconfig.json                # TypeScript 配置
│   │   └── node_modules/                # Hook 依赖（已安装）
│   ├── skills/                          # 知识库技能
│   │   ├── skill-developer/             # Meta-skill 目录
│   │   │   ├── SKILL.md                 # 主技能文件
│   │   │   ├── ADVANCED.md              # 高级主题
│   │   │   ├── HOOK_MECHANISMS.md       # Hook 机制
│   │   │   ├── PATTERNS_LIBRARY.md      # 模式库
│   │   │   ├── SKILL_RULES_REFERENCE.md # 规则参考
│   │   │   ├── TRIGGER_TYPES.md         # 触发类型
│   │   │   └── TROUBLESHOOTING.md       # 故障排除
│   │   └── skill-rules.json             # 技能触发配置
│   ├── agents/                          # 专业代理
│   │   ├── code-architecture-reviewer.md
│   │   ├── code-refactor-master.md
│   │   ├── documentation-architect.md
│   │   ├── plan-reviewer.md
│   │   ├── refactor-planner.md
│   │   └── web-research-specialist.md
│   ├── commands/                        # 斜杠命令
│   │   ├── dev-docs.md                  # 创建开发文档
│   │   └── dev-docs-update.md           # 更新开发文档
│   ├── settings.json                    # Claude Code 主配置
│   ├── README.md                        # 完整文档
│   ├── QUICKSTART.md                    # 快速入门
│   └── PROJECT_STRUCTURE.md             # 本文件
└── dev/                                 # 开发文档
    ├── active/                          # 活跃任务
    └── archive/                         # 已完成任务

## 文件统计

- Hooks: 2 核心 hooks（skill-activation, post-tool-use-tracker）
- Skills: 1 技能（skill-developer，包含 7 个资源文件）
- Agents: 6 个专业代理
- Commands: 2 个斜杠命令
- 配置文件: 3 个（settings.json, skill-rules.json, package.json）

## 关键配置

### settings.json
- 启用 UserPromptSubmit hook（技能激活）
- 启用 PostToolUse hook（文件跟踪）
- 配置权限和默认模式

### skill-rules.json
- 定义技能触发模式
- 配置关键词和意图模式
- 设置优先级和强制级别

## 工作流程

### 1. 技能自动激活
```
用户提问 → UserPromptSubmit Hook → 
分析关键词 → 匹配 skill-rules.json → 
建议相关技能
```

### 2. 文件变更跟踪
```
编辑文件 → PostToolUse Hook → 
检测项目结构 → 记录变更 → 
生成构建命令
```

### 3. 开发文档模式
```
/dev-docs [任务] → 创建三文件 →
实施 → /dev-docs-update → 
上下文重置 → 读取文档继续
```

## 集成时间：45 分钟

- ✅ 基础设施：15 分钟
- ✅ 技能配置：10 分钟
- ✅ 代理和命令：10 分钟
- ✅ 文档和验证：10 分钟

## 下一步扩展

1. **编辑器特定技能**
   - Canvas 操作模式
   - 渲染管线最佳实践
   - 状态管理模式
   - 性能优化指南

2. **编辑器专用代理**
   - Canvas 调试助手
   - 性能分析器
   - 组件测试生成器

3. **项目特定命令**
   - /test-canvas - Canvas 测试辅助
   - /perf-check - 性能检查
   - /component-gen - 组件生成

## 维护

### 定期检查
```bash
# 更新 hook 依赖
cd .claude/hooks && npm update

# 验证 JSON 配置
cat .claude/settings.json | python3 -m json.tool
cat .claude/skills/skill-rules.json | python3 -m json.tool

# 确保 hook 可执行
chmod +x .claude/hooks/*.sh
```

### 添加新技能

1. 在 `.claude/skills/` 创建技能目录
2. 编写 SKILL.md 和资源文件
3. 在 `skill-rules.json` 添加触发规则
4. 测试激活

## 原始来源

基于 `claude-code-infrastructure-showcase` 项目的生产验证模式：
`/Users/elvis/Github/claude-workspace/claude-code-infrastructure-showcase`

## 版本信息

- 配置版本: 1.0
- 创建日期: 2025-11-12
- 技术栈: React + TypeScript
- 集成级别: 完整（45分钟）
