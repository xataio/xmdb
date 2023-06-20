<h1 align="center">
  <a href="https://xmdb.vercel.app" target="_blank">
    <img src="/public/xmdb-hero.png" alt="Xata and XMDB logo" />
  </a>
</h1>

## Features ⚡️

- [Typo-Tolerant Full-Text Search](https://xata.io/docs/api-guide/search).
- [Aggregations](https://xata.io/docs/api-guide/aggregate).
- [Type-Safe SDK/ORM](https://github.com/xataio/client-ts/blob/main/packages/client/README.md) (schema-based types generation).
- Next.js App Directory with React Server Components.
- Intercepting Route
- Parallel Route

## Stack ⚙️

| Package     | Reason                        |
| ----------- | ----------------------------- |
| Zod         | Schema validation             |
| Xata Client | ORM                           |
| TailwindCSS | Styles                        |
| vercel/OG   | OG image generation           |
| React-Icons | SVG Icons as React components |

## Environment Setup 🧱

To have your own local instance of this app, you will need 2 API keys, and your deployment URL.

- [`XATA_API_TOKEN`](https://xata.io/docs/concepts/api-keys): to connect your own Xata workspace.
- `VERCEL_URL`: popullated by Vercel, on your local environment it’s your local server url (`https://localhost:3000` by default).

Once you have those keys, you can create a `.env.local` as shown in `.env.template`.

## Link to Xata 🦋

You can run the `xata init` command with some default configuration:

```sh
pnpm xata:link
```

By the end you should have the `XATA_API_TOKEN` in your `.env.local` and a `.xatarc` file created.

## Database Seed 🌱

Once you have a working link with the workspace, you can run:

```sh
pnpm xata:seed
```

This task will add **100 rows of mocked data** to get you started with a working app.

## Run Locally 🧑‍✈️

Once you project is linked and database has data, you can start the development server.

```sh
pnpm dev
```

By default, server will run on [localhost:3000](http://localhost:3000).

---

<img alt="Xata's logo" src="https://raw.githubusercontent.com/xataio/vscode-extension/2e3d0b877cf6aff1e0fc717e05ada714465ca783/doc/xata-icon-128.png" width="24" />
