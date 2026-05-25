# Issue Tracker — 本地 Markdown

## 存放位置

`.scratch/<feature>/` 目录下，每个 issue 一个 `.md` 文件。

## 文件格式

```yaml
---
title: 问题标题
status: open | in-progress | done | wontfix
assignee: ""
labels: []
created: 2026-05-11
updated: 2026-05-11
---

问题描述内容...
```

## 操作方式

- 创建：在 `.scratch/<feature>/` 下新建 `.md` 文件
- 读取：直接读取对应文件
- 更新：编辑文件的 frontmatter 或内容
- 列表：扫描 `.scratch/` 目录下所有 `.md` 文件
