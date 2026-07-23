# ParticleXF

[ParticleX](https://github.com/theme-particlex/hexo-theme-particlex) 的 Hexo 主题分支，基于上游主题做了更偏个人博客的定制：双主题、星空背景、TOC 抽屉、代码折叠/换行、数学公式、Mermaid、搜索和多种评论方案等。

## 特性

- 柔和深色 / 暖浅色双主题，使用 CSS 变量切换
- 顶栏主题切换并记忆用户选择
- 动态星空背景，浅色模式下显示更轻量的背景效果
- 文章 TOC：滚动高亮、平滑跳转、移动端抽屉
- 代码块：Highlight.js 高亮、自动换行、长代码可折叠
- 数学公式、Mermaid 图表、图片预览、文章加密、站内搜索
- 支持 giscus、Gitalk、Waline、Twikoo
- `{% note %}` 提示框标签

## 安装

### 方式一：直接克隆到主题目录

```bash
cd your-hexo-site
git clone https://github.com/FloranceYeh/hexo-theme-particlexf themes/particlexf
```

然后在站点根目录的 `_config.yml` 中启用主题：

```yaml
theme: particlexf
```

### 方式二：作为子模块

```bash
cd your-hexo-site
git submodule add https://github.com/FloranceYeh/hexo-theme-particlexf themes/particlexf
```

### 建议的站点依赖

```bash
npm install hexo-server hexo-deployer-git
```

如果你会用到评论、Mermaid 或加密功能，再按需安装对应服务端依赖。

## Hexo 兼容设置

为了避免 Hexo 自带能力和主题功能冲突，建议顺手检查下面几项：

### 关闭自带代码高亮

如果你在使用主题自带的 Highlight.js，建议关闭 Hexo 自带高亮。

```yaml
highlight:
  enable: false
prismjs:
  enable: false
```

如果你使用的是 Hexo 7 及以上版本，也可以按官方方式把 `syntax_highlighter` 关掉。

### 禁用自动归档页

如果你不需要 Hexo 自动生成年度 / 月度 / 日度归档，建议关闭它们，避免和主题的归档页体验重复。

```yaml
archive_generator:
  enabled: true
  per_page: 0
  yearly: false
  monthly: false
  daily: false
```

修改后建议执行一次 `hexo clean`。

## 主题配置

主题默认配置位于 [_config.yml](_config.yml)。常用项如下：

```yaml
avatar: /images/avatar.jpg

background:
  - /images/background.jpg

loading: /images/loading.gif

menu:
  Home:
    name: house
    theme: solid
    link: /
  About:
    name: id-card
    theme: solid
    link: /about

card:
  enable: true
  description: |
    Your name here.
    Your blog subtitle.

highlight:
  enable: true
  wrap: true
  collapse:
    enable: true
    lines: 20

math:
  enable: true

mermaid:
  enable: true

preview:
  enable: true

search:
  enable: true
```

### 评论配置

主题内置了多种评论适配，按需开启即可：

```yaml
giscus:
  enable: false

gitalk:
  enable: false

waline:
  enable: false
  serverURL: https://your-waline-server.example

twikoo:
  enable: false
```

`layout/comment.ejs` 会根据主题配置加载对应的评论脚本。

## Note 标签

```markdown
{% note tip %}
提示内容，支持 **Markdown**。
{% endnote %}

{% note warning 注意 %}
自定义标题。
{% endnote %}

{% note danger no-icon %}
不显示图标。
{% endnote %}
```

支持的类型包括：`note`、`info`、`tip`、`success`、`warning`、`danger`、`quote`。

## 目录结构

```text
hexo-theme-particlexf/
├── _config.yml
├── layout/
├── scripts/
├── source/
│   ├── css/main.css
│   └── js/
└── package.json
```

## 开发

在博客站点目录中执行：

```bash
hexo clean && hexo server
```

修改主题文件后刷新页面即可；修改配置后建议先清理缓存再重新生成。

## 许可证

MIT。

## 致谢

- [hexo-theme-particlex](https://github.com/theme-particlex/hexo-theme-particlex)
- [Font Awesome](https://fontawesome.com)
- [Highlight.js](https://highlightjs.org)
- [Waline](https://github.com/walinejs/waline)
