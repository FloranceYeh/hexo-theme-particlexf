# ParticleXF

A Hexo theme fork of [ParticleX](https://github.com/theme-particlex/hexo-theme-particlex), customized for personal blogs: dual themes, starry background, TOC drawer, code folding/wrapping, math support, Mermaid, search, and multiple comment options.

[中文 Readme](README.zh-CN.md)

## Features

- Soft dark / warm light dual themes using CSS variables
- Theme toggle in the top bar with user preference persistence
- Dynamic starry background (lighter effect in light mode)
- Article TOC with scroll highlighting, smooth jump, and a mobile drawer
- Code blocks: Highlight.js, automatic wrapping, and collapsible long code
- Math formulas, Mermaid diagrams, image preview, encrypted posts, site search
- Supports giscus, Gitalk, Waline, Twikoo
- `{% note %}` callout boxes

## Installation

### Option 1 — Clone into your themes directory

```bash
cd your-hexo-site
git clone https://github.com/FloranceYeh/hexo-theme-particlexf themes/particlexf
```

Then enable the theme in your site's `_config.yml`:

```yaml
theme: particlexf
```

### Option 2 — As a submodule (recommended)

```bash
cd your-hexo-site
git submodule add https://github.com/FloranceYeh/hexo-theme-particlexf themes/particlexf
```

Also enable the theme in `_config.yml`.

### Recommended site dependencies

```bash
npm install hexo-server hexo-deployer-git
```

Install additional dependencies if you use comments, Mermaid, or encryption features.

## Hexo compatibility tips

To avoid conflicts between Hexo built-in features and the theme, consider these settings.

### Disable Hexo's built-in syntax highlighting

If you use the theme's Highlight.js, disable Hexo's built-in highlighter by clearing `syntax_highlighter` in your site's `_config.yml`:

```yaml
syntax_highlighter:
```

### Disable automatic archive pages

If you don't need Hexo's automatic yearly/monthly/daily archives, disable them to avoid duplicate archive pages:

```yaml
archive_generator:
  enabled: true
  per_page: 0
  yearly: false
  monthly: false
  daily: false
```

After changes, run `hexo clean`.

## Theme configuration

The theme defaults are in `_config.yml`. Common options:

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

stellars:
    enable: true
    seedChanger:
        enable: false
```

### Comments

The theme includes adapters for several comment systems. Enable the one you want in your theme config:

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

The `layout/comment.ejs` template loads the appropriate comment script based on these settings.

## Note blocks

Use the `{% note %}` tag for callouts:

```markdown
{% note tip %}
Tip content supports **Markdown**.
{% endnote %}

{% note warning Custom title %}
Custom title.
{% endnote %}

{% note danger no-icon %}
No icon.
{% endnote %}
```

Supported types: `note`, `info`, `tip`, `success`, `warning`, `danger`, `quote`.

## Layout

```
hexo-theme-particlexf/
├── _config.yml
├── layout/
├── scripts/
├── source/
│   ├── css/main.css
│   └── js/
└── package.json
```

## Development

From your blog site directory run:

```bash
hexo clean && hexo server
```

Edit theme files and refresh the browser. After config changes, run a clean before regenerating.

## License

MIT.

## Credits

- [hexo-theme-particlex](https://github.com/theme-particlex/hexo-theme-particlex)
- [Font Awesome](https://fontawesome.com)
- [Highlight.js](https://highlightjs.org)
- [Waline](https://github.com/walinejs/waline)
