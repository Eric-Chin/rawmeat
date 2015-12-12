---
title: 使用教程
date: 2015-12-12
categories:
- help
---

首先确保你安装了 `node >= 4.0.0` 的版本。

在 fork 了一份之后本地执行:

```bash
npm install
```

新建文章:

```bash
npm run post hello-world
```

添加文章后重新生成首页的文章列表:

```bash
npm run build
```

你可以在根目录的 `rawmeat.json` 填写你的博客信息。