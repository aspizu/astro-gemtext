# `astro-gemtext`

![https://www.npmjs.com/package/astro-gemtext](https://img.shields.io/npm/dm/astro-gemtext)

`astro-gemtext` is the Astro integration for [gemtext](https://geminiprotocol.net/)
documents. gemtext is a hypertext markup language used in the Gemini protocol. This
integration allows you to use `.gmi` files as pages in your Astro site. Just install
the integration and `.gmi` files in `/src/pages` will be rendered as HTML.

## Installation

```shell
npm install astro-gemtext
```

Add to `astro.config.mjs`

```ts
import gemtext from "astro-gemtext"

export default defineConfig({
    integrations: [gemtext({layout: "/src/layouts/Layout.astro"})],
})
```

> [!IMPORTANT]
> If you do not provide a layout option, Astro's HMR (Hot Module Reloading) and toolbar
> will not work.

## Usage

Create a .gmi file in your project, for example:

```gmi
# Hello World

This is a gemtext file.

=> gemtext.gemini README.md
```

## Configuration

### `layout`

The layout to use for the page. Set to an absolute import path such as
`/src/layouts/Layout.astro`.
Will be provided the `title` prop.
If you do not provide a layout option, Astro's HMR (Hot Module Reloading) and toolbar
will not work.

### `titleFormat`

The format to use for the page title. Can be one of:

- `first-heading`: The first heading in the document will be used as the title. (default)
- `filename`: The filename of the document will be used as the title.

The title is passed to the layout as the `title` prop.
