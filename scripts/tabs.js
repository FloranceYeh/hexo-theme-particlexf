"use strict";

/**
 * Tabs tag (ParticleXF theme).
 *
 * Usage:
 *   {% tabs First @code Second @image default:1 %}
 *   First tab content
 *   <!-- tabs -->
 *   Second tab content
 *   {% endtabs %}
 *
 * Labels and optional @icons are space-separated. default:N is zero-based.
 * Separate content blocks with <!-- tabs -->.
 */
const ID_COUNTER = { value: 0 };

hexo.extend.tag.register("tabs", function (args, content) {
    const blocks = content.split(/\n?<!--\s*tabs\s*-->\n?/);
    const id = `tabs-${++ID_COUNTER.value}`;
    let defaultTab = 0;
    const labelArgs = args.filter((arg) => {
        if (/^default:\d+$/i.test(arg)) {
            defaultTab = parseInt(arg.split(":")[1], 10);
            return false;
        }
        return true;
    });
    const labels = [];

    for (let i = 0; i < labelArgs.length;) {
        if (labelArgs[i].startsWith("@")) {
            labels.push({ text: "", icon: labelArgs[i].slice(1) });
            i++;
            continue;
        }
        const next = labelArgs[i + 1] && labelArgs[i + 1].startsWith("@") ? labelArgs[i + 1] : null;
        labels.push({ text: labelArgs[i].replace(/,/g, ""), icon: next ? next.slice(1) : null });
        i += next ? 2 : 1;
    }

    if (!labels.length) {
        blocks.forEach((_, i) => {
            const translated = hexo.__("tabs_default_label", i + 1);
            labels.push({ text: translated || `Tab ${i + 1}`, icon: null });
        });
    }

    const html = [`<div class="tabs" id="${id}">`, '  <div class="tabs-nav" role="tablist">'];
    labels.forEach((label, i) => {
        const icon = label.icon ? `<i class="fa-solid fa-${label.icon}"></i>` : "";
        const text = label.text ? `<span>${label.text}</span>` : "";
        const iconOnly = label.text ? "" : " tab-icon-only";
        const active = i === defaultTab ? " active" : "";
        html.push(`    <button class="tabs-tab${iconOnly}${active}" role="tab" data-tab="${i}" data-tabs-id="${id}">${icon}${text}</button>`);
    });
    html.push("  </div>", '  <div class="tabs-content">');

    blocks.forEach((block, i) => {
        const rendered = hexo.render.renderSync({ text: block, engine: "markdown" });
        const active = i === defaultTab ? " active" : "";
        html.push(`    <div class="tabs-pane${active}" role="tabpanel" data-tab="${i}" data-tabs-id="${id}">${rendered}</div>`);
    });
    html.push("  </div>", "</div>");
    return html.join("\n") + "\n";
}, { ends: true });
