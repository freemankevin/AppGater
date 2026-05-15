# Domain Docs

工程技能在探索代码库时如何消费本仓库的领域文档。

## 探索前先读这些

- **`CONTEXT.md`** 在仓库根目录，或
- **`CONTEXT-MAP.md`** 在仓库根目录（如果存在）— 它指向每个上下文的 `CONTEXT.md`。读取与主题相关的每一个。
- **`docs/adr/`** — 读取与你即将工作的区域相关的 ADR。多上下文仓库中，同时检查 `src/<context>/docs/adr/` 中的上下文专属决策。

如果这些文件不存在，**静默继续**。不要提示缺失；不要建议预先创建。生产者技能（`/grill-with-docs`）会在术语或决策实际确定时惰性创建它们。

## 文件结构

单上下文仓库（大多数仓库）：

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

多上下文仓库（根目录存在 `CONTEXT-MAP.md`）：

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← 全系统决策
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← 上下文专属决策
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## 使用词汇表的术语

当输出中命名领域概念（在 issue 标题、重构提案、假设、测试名称中），使用 `CONTEXT.md` 中定义的术语。不要偏离词汇表明确避免的同义词。

如果需要的概念不在词汇表中，这是一个信号 — 要么你在发明项目不使用的语言（重新考虑），要么存在真正的缺口（记录给 `/grill-with-docs`）。

## 标记 ADR 冲突

如果输出与现有 ADR 矛盾，显式指出而不是静默覆盖：

> _与 ADR-0007（event-sourced orders）矛盾 — 但值得重新讨论，因为…_
