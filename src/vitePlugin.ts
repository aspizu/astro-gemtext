import {HTMLRenderer, parse} from "gemtext"
import {pathToFileURL} from "url"
import type {Plugin} from "vite"
import {ext} from "./index.js"

function transform(code: string, id: string) {
    const result = parse(code)
    const html = result.generate(HTMLRenderer)
    return `
import {
    createComponent,
    render,
    renderComponent,
    unescapeHTML,
} from "astro/runtime/server/index.js";
import { Fragment, jsx as h } from "astro/jsx-runtime";
import Layout from "../layouts/Layout.astro";
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
    return h(Layout, {title: url, children: content});
}
export default Content;
`
}

export default function gemtextVitePlugin(): Plugin {
    // let server: ViteDevServer
    return {
        name: "astro-gemtext",
        enforce: "pre",
        transform(code, id) {
            if (!id.endsWith(`.${ext}`)) return
            return {
                code: transform(code, id),
                map: null,
            }
        },
    }
}
