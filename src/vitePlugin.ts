import {HTMLRenderer, parse} from "gemtext"
import {pathToFileURL} from "url"
import type {Plugin} from "vite"
import {ext, type GemtextConfig} from "./index.js"

function transform(code: string, id: string, config: GemtextConfig) {
    const result = parse(code)
    let title

    if (config.titleFormat === "first-heading") {
        for (const node of result.data) {
            if (node._ === 4) {
                title = node.text
                break
            }
        }
    } else if (config.titleFormat === "filename") {
        title = pathToFileURL(id).pathname.split("/").pop()
    }
    const html = result.generate(HTMLRenderer)
    return `
import {
    createComponent,
    render,
    renderComponent,
    unescapeHTML,
} from "astro/runtime/server/index.js";
import { Fragment, jsx as h } from "astro/jsx-runtime";
${config.layout ? `import Layout from ${JSON.stringify(config.layout)};` : ""}
export const name = "TypstComponent";
export const html = ${JSON.stringify(html)};
export const frontmatter = undefined;
export const file = ${JSON.stringify(id)};
export const url = ${JSON.stringify(pathToFileURL(id))};
export function compiledContent() {
    return html;
}
export function getHeadings() {
    return undefined;
}
export async function Content() {
    const content = h(Fragment, {"set:html": html});
    ${config.layout && `return h(Layout, {title: ${JSON.stringify(title)}}, content);`}
    ${!config.layout && `return content;`}
}
export default Content;
`
}

export default function gemtextVitePlugin(config: GemtextConfig): Plugin {
    // let server: ViteDevServer
    return {
        name: "astro-gemtext",
        enforce: "pre",
        transform(code, id) {
            if (!id.endsWith(`.${ext}`)) return
            return {
                code: transform(code, id, config),
                map: null,
            }
        },
    }
}
