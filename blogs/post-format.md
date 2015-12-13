---
title: 正确的文章格式
date: 2015-12-13
categories:
  - 帮助
---
标准的生肉博客文章格式其实和 Jekyll 是完全一样的，而和 Hexo 的区别也只是开头建议以 `---` 开始，这样 GitHub 能识别开头的 meta 并渲染成一个表格。

同时，开头的 meta 必须有的信息是 `title` `date` `categories`。

以下是一个标准的格式，你可以用 `npm run post hello-world` 快速生成一个：

```markdown
---
title: 你好世界
date: 2015-12-21
categories:
  - 我的生活
---
今天吃了三个土豆，开始想念乐视了。
```
