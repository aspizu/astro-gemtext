import type {AstroIntegration, ContentEntryType, HookParameters} from "astro"
import {fileURLToPath} from "url"
import gemtextVitePlugin from "./vitePlugin.js"

export const ext = "gmi"

export interface GemtextConfig {
    layout?: string
}

type SetupHookParams = HookParameters<"astro:config:setup"> & {
    // `addPageExtension` and `contentEntryType` are not a public APIs
    // Add type defs here
    addPageExtension: (extension: string) => void
    addContentEntryType: (contentEntryType: ContentEntryType) => void
}

export default function gemtext(config: GemtextConfig = {}): AstroIntegration {
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
