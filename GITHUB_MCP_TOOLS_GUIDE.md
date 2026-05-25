# GitHub MCP 工具使用说明

## 概述

GitHub MCP 工具套件是一组允许与 GitHub 平台进行交互的工具。这些工具可以帮助您：

- 管理仓库内容
- 创建和管理议题
- 创建和管理拉取请求
- 搜索代码和议题
- 管理分支等

## 工具列表及其功能

### 1. mcp_github_create_or_update_file

创建或更新 GitHub 仓库中的单个文件。

**参数：**
- `branch`: 要在其中创建/更新文件的分支
- `content`: 文件内容
- `message`: 提交消息
- `owner`: 仓库所有者（用户名或组织）
- `path`: 创建/更新文件的路径
- `repo`: 仓库名称
- `sha`: 要替换的文件的 SHA（更新现有文件时必需）

**示例：**
```bash
# 在有适当凭据的情况下
{
  "branch": "main",
  "content": "# Hello World\nThis is a sample file.",
  "message": "Add sample file",
  "owner": "your-username",
  "path": "docs/sample.md",
  "repo": "your-repo-name"
}
```

### 2. mcp_github_search_repositories

搜索 GitHub 仓库。

**参数：**
- `page`: 页码（默认：1）
- `perPage`: 每页结果数（默认：30，最大：100）
- `query`: 搜索查询（参见 GitHub 搜索语法）

**示例：**
```bash
{
  "query": "sling snake identification",
  "perPage": 20,
  "page": 1
}
```

### 3. mcp_github_create_repository

在您的账户中创建新的 GitHub 仓库。

**参数：**
- `autoInit`: 是否用 README.md 初始化
- `description`: 仓库描述
- `name`: 仓库名称
- `private`: 仓库是否私有

**示例：**
```bash
{
  "name": "new-sling-project",
  "description": "New project for sling application",
  "private": false,
  "autoInit": true
}
```

### 4. mcp_github_get_file_contents

获取 GitHub 仓库中的文件内容。

**参数：**
- `branch`: 要从中获取内容的分支
- `owner`: 仓库所有者（用户名或组织）
- `path`: 文件或目录的路径
- `repo`: 仓库名称

**示例：**
```bash
{
  "owner": "your-username",
  "repo": "your-repo",
  "path": "/README.md",
  "branch": "main"
}
```

### 5. mcp_github_push_files

将多个文件推送到 GitHub 仓库。

**参数：**
- `branch`: 要推送到的分支
- `files`: 要推送的文件数组
- `message`: 提交消息
- `owner`: 仓库所有者（用户名或组织）
- `repo`: 仓库名称

**示例：**
```bash
{
  "branch": "main",
  "files": [
    {
      "path": "src/main.js",
      "content": "// Main JavaScript file\nconsole.log('Hello, world!');"
    },
    {
      "path": "README.md",
      "content": "# New README\nThis is the new README."
    }
  ],
  "message": "Add new files",
  "owner": "your-username",
  "repo": "your-repo"
}
```

### 6. mcp_github_create_issue

在 GitHub 仓库中创建新议题。

**参数：**
- `assignees`: 分配给议题的用户列表
- `body`: 议题正文
- `labels`: 议题标签
- `milestone`: 里程碑编号
- `owner`: 仓库所有者
- `repo`: 仓库名称
- `title`: 议题标题

**示例：**
```bash
{
  "owner": "your-username",
  "repo": "your-repo",
  "title": "Bug in snake identification service",
  "body": "There is an issue with the snake identification service causing incorrect results.",
  "labels": ["bug", "high-priority"]
}
```

### 7. mcp_github_create_pull_request

创建拉取请求。

**参数：**
- `base`: 您希望更改合并到的分支名称
- `body`: 拉取请求正文/描述
- `draft`: 是否创建草稿拉取请求
- `head`: 实现更改的分支名称
- `maintainer_can_modify`: 维护者是否可以修改拉取请求
- `owner`: 仓库所有者
- `repo`: 仓库名称
- `title`: 拉取请求标题

**示例：**
```bash
{
  "owner": "your-username",
  "repo": "your-repo",
  "title": "Fix bug in snake identification algorithm",
  "head": "feature/fix-snake-id",
  "base": "main",
  "body": "This PR fixes a bug in the snake identification algorithm that was causing incorrect results."
}
```

### 8. mcp_github_fork_repository

将 GitHub 仓库 fork 到您的账户或指定组织。

**参数：**
- `organization`: 可选：要 fork 到的组织（默认为您的个人账户）
- `owner`: 仓库所有者
- `repo`: 仓库名称

**示例：**
```bash
{
  "owner": "original-owner",
  "repo": "repository-to-fork"
}
```

### 9. mcp_github_search_code

在 GitHub 仓库中搜索代码。

**参数：**
- `order`: 排序顺序（asc/desc）
- `page`: 页码
- `per_page`: 每页结果数
- `q`: 搜索查询

**示例：**
```bash
{
  "q": "filename:pom.xml spring-boot",
  "per_page": 30
}
```

### 10. mcp_github_search_issues

搜索议题和拉取请求。

**参数：**
- `order`: 排序顺序（asc/desc）
- `page`: 页码
- `per_page`: 每页结果数
- `q`: 搜索查询
- `sort`: 排序方式

**示例：**
```bash
{
  "q": "repo:your-username/your-repo is:issue is:open",
  "sort": "updated",
  "order": "desc"
}
```

## 注意事项

1. **认证**: 所有 GitHub 工具都需要有效的 GitHub 凭据才能正常工作。
2. **权限**: 确保您有足够的权限来执行所需的操作（例如，读取仓库、写入文件、创建议题等）。
3. **速率限制**: GitHub API 有速率限制，请注意不要超出限制。
4. **安全性**: 不要在代码中硬编码任何敏感信息，如令牌或密码。

## 如何设置认证

要使用这些工具，您需要设置 GitHub 个人访问令牌：

1. 转到 GitHub 设置 > 开发者设置 > 个人访问令牌
2. 生成新令牌并确保勾选适当的权限范围
3. 在使用这些工具时，系统会提示您输入令牌