"use strict";

/**
 * Chat transcript tag (ParticleXF theme).
 *
 * Usage:
 *   {% chat wechat title="Project group" logo="/images/logo.png" expanded=false %}
 *   A:John,/images/avatar.jpg
 *   A|10:24|Hello
 *   me|10:25|[image:/images/photo.jpg Photo]
 *   {% endchat %}
 *
 * Platforms: wechat, qq, telegram. Messages use role|time|message;
 * time is optional. Define a speaker with ID:name,avatar URL.
 * me, self, 我, and right render on the right. Use collapsed or
 * expanded=false to start with the transcript closed.
 */

const ID_COUNTER = { value: 0 };
const PLATFORMS = {
    wechat: { icon: "weixin", className: "wechat", titleKey: "chat_wechat_title" },
    weixin: { icon: "weixin", className: "wechat", titleKey: "chat_wechat_title" },
    wx: { icon: "weixin", className: "wechat", titleKey: "chat_wechat_title" },
    qq: { icon: "qq", className: "qq", titleKey: "chat_qq_title" },
    telegram: { icon: "telegram", className: "telegram", titleKey: "chat_telegram_title" },
    tg: { icon: "telegram", className: "telegram", titleKey: "chat_telegram_title" },
};

function translate(key, fallback) {
    const language = String(hexo.config.language || "default");
    const translateFn = hexo.theme && hexo.theme.i18n
        ? hexo.theme.i18n.__([language, "default"])
        : null;
    const value = translateFn ? translateFn(key) : key;
    return value === key ? fallback : value;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function parseOptions(args, platform) {
    let title = translate(platform.titleKey, platform.titleKey);
    let subtitle = "";
    let logo = "";
    let expanded = true;
    args.slice(1).forEach((arg) => {
        const token = String(arg);
        if (/^collapsed$/i.test(token)) { expanded = false; return; }
        const match = token.match(/^(title|name|subtitle|logo|expanded)=(.*)$/i);
        if (!match) return;
        const value = match[2].replace(/^['"]|['"]$/g, "");
        const key = match[1].toLowerCase();
        if (key === "subtitle") subtitle = value;
        else if (key === "logo") logo = value;
        else if (key === "expanded") expanded = !/^(false|0|no)$/i.test(value);
        else title = value;
    });
    return { title, subtitle, logo, expanded };
}

function parseLine(line) {
    const value = String(line).trim();
    if (!value || value.startsWith("<!--")) return null;
    const fields = value.split("|").map((field) => field.trim());
    let role = fields.shift() || "other";
    let time = "";
    let message = fields.join("|");
    if (fields.length > 1) {
        time = fields.shift();
        message = fields.join("|");
    }
    const right = /^(me|self|我|本人|right|自己)$/i.test(role);
    if (role.startsWith("@")) role = role.slice(1);
    return { role, time, message, right };
}

function parseSpeaker(line) {
    const value = String(line).trim();
    const separator = value.indexOf(":");
    if (separator < 1 || value.includes("|")) return null;
    const id = value.slice(0, separator).trim();
    const fields = value.slice(separator + 1).replace(/^\s*,\s*/, "").split(",");
    if (!id || fields.length < 2) return null;
    const name = fields.shift().trim();
    const avatar = fields.join(",").trim().replace(/^<|>$/g, "");
    if (!name || !avatar) return null;
    return { id, name, avatar };
}

function renderMessage(value, imageAlt) {
    const pattern = /\[(?:img|image):\s*((?:https?:\/\/|\/)[^\]\s]+)(?:\s+([^\]]+))?\]/gi;
    let html = "";
    let cursor = 0;
    let match;
    const text = String(value).replace(/!\[([^\]]*)\]\(((?:https?:\/\/|\/)[^)]+)\)/gi, "[image:$2 $1]");
    while ((match = pattern.exec(text))) {
        html += escapeHtml(text.slice(cursor, match.index));
        const alt = match[2] ? escapeHtml(match[2].trim()) : escapeHtml(imageAlt);
        html += `<img class="chat-image" src="${escapeHtml(match[1])}" alt="${alt}" loading="lazy">`;
        cursor = match.index + match[0].length;
    }
    return (html + escapeHtml(text.slice(cursor))).replace(/\n/g, "<br>");
}

hexo.extend.tag.register("chat", function (args, content) {
    const requested = String(args[0] || "wechat").toLowerCase();
    const platform = PLATFORMS[requested] || PLATFORMS.wechat;
    const options = parseOptions(args, platform);
    const speakers = {};
    const rawLines = String(content || "").split(/\r?\n/);
    rawLines.forEach((line) => {
        const speaker = parseSpeaker(line);
        if (speaker) speakers[speaker.id.toLowerCase()] = speaker;
    });
    const lines = rawLines.filter((line) => !parseSpeaker(line)).map(parseLine).filter(Boolean);
    const id = `chat-${++ID_COUNTER.value}`;

    const messages = lines.map((item) => {
        const speaker = speakers[item.role.toLowerCase()];
        const displayName = speaker ? speaker.name : item.role;
        const initial = escapeHtml(displayName.slice(0, 1) || (item.right ? "我" : "友"));
        const avatar = speaker && /^(?:https?:\/\/|\/)/i.test(speaker.avatar)
            ? `<img src="${escapeHtml(speaker.avatar)}" alt="" loading="lazy">`
            : initial;
        const time = item.time ? `<time>${escapeHtml(item.time)}</time>` : "";
        const body = renderMessage(item.message, translate("chat_image_alt", "Chat image"));
        const side = item.right ? " chat-message-right" : "";
        return `<div class="chat-message${side}">` +
            `<div class="chat-avatar" aria-hidden="true">${avatar}</div>` +
            `<div class="chat-message-body">${time}<div class="chat-speaker">${escapeHtml(displayName)}</div><div class="chat-bubble">${body}</div></div>` +
            `</div>`;
    }).join("\n");
    const logoHtml = /^(?:https?:\/\/|\/)/i.test(options.logo)
        ? `<img src="${escapeHtml(options.logo)}" alt="" loading="lazy">`
        : `<i class="fa-brands fa-${platform.icon}"></i>`;
    const collapsed = options.expanded ? "" : " chat-collapsed";
    const expandedValue = options.expanded ? "true" : "false";

    return [
        `<section class="chat-widget chat-${platform.className}${collapsed}" id="${id}" aria-label="${escapeHtml(options.title)}">`,
        `  <button class="chat-header" type="button" aria-expanded="${expandedValue}" aria-controls="${id}-messages">`,
        `    <span class="chat-brand-icon" aria-hidden="true">${logoHtml}</span>`,
        `    <span class="chat-header-copy"><strong>${escapeHtml(options.title)}</strong>${options.subtitle ? `<small>${escapeHtml(options.subtitle)}</small>` : ""}</span>`,
        `    <span class="chat-status" aria-hidden="true"></span>`,
        `  </button>`,
        `  <div class="chat-messages" id="${id}-messages">${messages || `<p class="chat-empty">${escapeHtml(translate("chat_empty", "No chat messages"))}</p>`}</div>`,
        `</section>`,
    ].join("\n");
}, { ends: true });
