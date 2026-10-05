/**
 * Note / callout tag (ParticleXF theme).
 *
 * Usage:
 *   {% note %}Default note{% endnote %}
 *   {% note tip %}Tip body{% endnote %}
 *   {% note warning 注意 %}With custom title{% endnote %}
 *   {% note danger no-icon %}No icon{% endnote %}
 *
 * Types: note | info | tip | success | warning | danger | quote
 */
"use strict";

const TYPES = {
    note: { icon: "fa-solid fa-pen", title: "Note" },
    info: { icon: "fa-solid fa-circle-info", title: "Info" },
    tip: { icon: "fa-solid fa-lightbulb", title: "Tip" },
    success: { icon: "fa-solid fa-circle-check", title: "Success" },
    warning: { icon: "fa-solid fa-triangle-exclamation", title: "Warning" },
    danger: { icon: "fa-solid fa-circle-xmark", title: "Danger" },
    quote: { icon: "fa-solid fa-quote-left", title: "Quote" },
};

const ZH_TYPES = {
    note: "说明",
    info: "信息",
    tip: "提示",
    success: "成功",
    warning: "警告",
    danger: "危险",
    quote: "引用",
};

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

hexo.extend.tag.register(
    "note",
    function (args, content) {
        const tokens = args.map((a) => String(a).trim()).filter(Boolean);
        let type = "note";
        let showIcon = true;
        const titleParts = [];

        tokens.forEach((t) => {
            const lower = t.toLowerCase();
            if (TYPES[lower]) {
                type = lower;
            } else if (lower === "no-icon" || lower === "noicon") {
                showIcon = false;
            } else {
                titleParts.push(t);
            }
        });

        const meta = TYPES[type] || TYPES.note;
        const language = String(hexo.config.language || "en").toLowerCase();
        const defaultTitle = language === "zh-cn" || language === "zh_cn" || language === "zh"
            ? ZH_TYPES[type]
            : meta.title;
        const title = titleParts.length ? titleParts.join(" ") : defaultTitle;
        const rendered = hexo.render.renderSync({ text: content, engine: "markdown" });

        const iconHtml = showIcon
            ? `<span class="note-icon" aria-hidden="true"><i class="${meta.icon}"></i></span>`
            : "";

        return [
            `<div class="note note-${type}" role="note">`,
            `  <div class="note-title">`,
            iconHtml,
            `    <span class="note-title-text">${escapeHtml(title)}</span>`,
            `  </div>`,
            `  <div class="note-body">${rendered}</div>`,
            `</div>`,
        ].join("\n");
    },
    { ends: true }
);
