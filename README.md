# hexo-theme-particlex

基于 [ParticleX](https://github.com/theme-particlex/hexo-theme-particlex) 的 Hexo 主题分支，包含明暗双主题、星空背景、TOC 抽屉、代码折叠/换行、Note 提示框等定制。

## 功能概览

- **柔和深色 / 暖浅色** 双主题（CSS 变量，非反色滤镜）
- 顶栏主题切换，`localStorage` 记忆
- 动态星空背景（浅色模式为淡色星云）
- 文章 TOC：滚动高亮、平滑跳转、移动端抽屉
- 代码块：明暗双高亮、自动换行、可配置折叠
- Waline 评论颜色跟随主题
- `{% note %}` 多样式提示框（主题 `scripts/note.js`）

## 安装

### 方式一：Git 子模块 / clone 到 themes

```bash
cd your-hexo-site
git clone <你的主题仓库地址> themes/particlex
```

在站点根目录 `_config.yml` 中设置：

```yaml
theme: particlex
```

### 方式二：作为子模块

```bash
git submodule add <你的主题仓库地址> themes/particlex
```

### 站点依赖建议

```bash
npm install hexo-server hexo-deployer-git
# 可选：mermaid / 评论等按需安装
```

复制并编辑主题配置：

```bash
# 主题默认配置在 themes/particlex/_config.yml
# 按需修改 avatar、menu、card、waline 等
```

把站点静态资源放到 `source/images/`（如 `avatar.jpg`、`background_s.jpg`、`loading.gif`），与 `_config.yml` 中路径一致。

## 配置摘录

```yaml
# themes/particlex/_config.yml
highlight:
  enable: true
  wrap: true
  collapse:
    enable: true
    lines: 20

waline:
  enable: true
  serverURL: https://your-waline-server/
  # dark 选择器在 layout/comment.ejs 中跟随 data-theme
```

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

类型：`note` | `info` | `tip` | `success` | `warning` | `danger` | `quote`

## 目录结构

```
hexo-theme-particlex/
├── _config.yml          # 主题默认配置
├── layout/              # EJS 模板
├── scripts/             # Hexo 标签等（note.js）
├── source/
│   ├── css/main.css
│   └── js/
└── package.json
```

## 开发

在博客站点中：

```bash
hexo clean && hexo server
```

修改主题文件后刷新即可；改配置后建议 `hexo clean` 再生成。

## 许可证

MIT（与上游 ParticleX 用法保持一致时请自行核对上游许可声明）。

## 致谢

- [hexo-theme-particlex](https://github.com/theme-particlex/hexo-theme-particlex)
- Font Awesome、Highlight.js、Waline 等
