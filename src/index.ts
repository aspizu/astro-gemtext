import type {AstroIntegration, ContentEntryType, HookParameters} from "astro"
import {fileURLToPath} from "url"
import gemtextVitePlugin from "./vitePlugin.js"

export const ext = "gmi"

/** Gemtext configuration options */
export interface GemtextConfig {
    /** Absolute import path to the layout to use for all gemtext pages.
     * If not provided, HMR and the Astro toolbar will not work. (default: none) */
    layout?: string
    /** The format to use for the page title. Can be one of:
     * - `first-heading`: The first heading in the document will be used as the title. (default)
     * - `filename`: The filename of the document will be used as the title.
     */
    titleFormat?: "first-heading" | "filename"
}

type SetupHookParams = HookParameters<"astro:config:setup"> & {
    // `addPageExtension` and `contentEntryType` are not a public APIs
    // Add type defs here
    addPageExtension: (extension: string) => void
    addContentEntryType: (contentEntryType: ContentEntryType) => void
}

export default function gemtext(config: GemtextConfig = {}): AstroIntegration {
    if (!config.titleFormat) {
        config.titleFormat = "first-heading"
    }
    return {
        name: "astro-gemtext",
        hooks: {
            "astro:config:setup": async (_params) => {
                const params = _params as SetupHookParams
                params.addRenderer({
                    name: "astro-gemtext",
                    serverEntrypoint: fileURLToPath(
                        new URL("./renderer.js", import.meta.url),
                    ),
                })
                params.addPageExtension(ext)
                params.addContentEntryType({
                    extensions: [`.${ext}`],
                    getEntryInfo: async (params) => {
                        throw new Error("Not implemented")
                    },
                })
                params.updateConfig({
                    vite: {
                        plugins: [gemtextVitePlugin(config)],
                    },
                })
            },
        },
    }
}
