# Issue tracker: GitHub

Issues 和 PRD 使用 GitHub Issues 追踪。所有操作使用 `gh` CLI。

## 约定

- **创建 Issue**: `gh issue create --title "..." --body "..."`。多行正文使用 heredoc。
- **查看 Issue**: `gh issue view <number> --comments`，用 `jq` 过滤评论并获取标签。
- **列出 Issue**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，可加上 `--label` 和 `--state` 过滤。
- **评论 Issue**: `gh issue comment <number> --body "..."`
- **添加 / 移除标签**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭 Issue**: `gh issue close <number> --comment "..."`

`gh` 会自动从 `git remote -v` 推断仓库，在克隆目录中运行即可。

## 当技能要求"发布到问题追踪器"

创建 GitHub Issue。

## 当技能要求"获取相关工单"

运行 `gh issue view <number> --comments`。
