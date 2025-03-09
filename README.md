# `astro-gemtext`

![https://www.npmjs.com/package/astro-gemtext](https://img.shields.io/npm/dm/astro-gemtext)

## Installation

```
bun add --save astro-gemtext
```

Add to `astro.config.mjs`

```ts
import gemtext from "astro-gemtext"

export default defineConfig({
    integrations: [gemtext({layout: "/src/layouts/Layout.astro"})],
})
```

## Usage

Create a `/src/pages/example.gmi` file

```gmi
# Hello World

This is a gemtext file.

=> gemtext.gemini README.md
```

## Configuration

### `layout`

The layout to use for the page. Set to an absolute import path such as
`/src/layouts/Layout.astro`. If you do not use a layout, you will not get HMR, or the
Astro toolbar.
