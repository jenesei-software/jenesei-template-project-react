# Jenesei Template for React Project

A production-ready React application template used as a starting point for Jenesei frontend projects.

The template includes routing, data fetching, localization, PWA support, environment-based builds, app metadata injection, icon generation, robots.txt handling, and a strict formatting/linting setup.

## Stack

- React 19
- Vite 8
- TypeScript 6
- TanStack Router
- TanStack Query
- TanStack Form
- i18next and react-i18next
- Jenesei Kit React
- Vite PWA
- Biome
- Yarn

## Requirements

- Node.js `22.18.0`
- Yarn

Use the Node version from `.nvmrc`:

```bash
nvm use
```

## Getting Started

Install dependencies:

```bash
yarn install
```

Start the local development server:

```bash
yarn start
```

By default, Vite starts on port `3000`. The port can be changed with `VITE_PORT`.

## Scripts

| Command | Description |
| --- | --- |
| `yarn start` | Start the Vite dev server. |
| `yarn build` | Type-check, then build into `VITE_OUTPUT_DIR`. |
| `yarn check` | Run the same checks as the release pipeline: Biome then `tsc`. |
| `yarn typecheck` | Type-check only. |
| `yarn biome:lint` | Run Biome lint. |
| `yarn biome:format` | Format source files with Biome. |
| `yarn bundle-visualizer` | Open the Vite bundle visualizer. |

There are no per-environment scripts. The environment comes from `VITE_NODE_ENV`,
not from a `--mode` flag, so one build script serves every environment.

## Environment

The project uses `VITE_*` variables. Values live in the deployment platform, not in
the repository, so the same commit produces a different bundle per environment.

Required keys are listed in `.env.template`. No other env file is committed. Copy the
template to `.env.local` for local work.

| Variable | Purpose |
| --- | --- |
| `VITE_DEFAULT_DESCRIPTION` | Default application description for metadata and PWA manifest. |
| `VITE_DEFAULT_NAME` | Full application name. |
| `VITE_DEFAULT_NAME_SHORT` | Short application name. |
| `VITE_DEFAULT_THEME_COLOR` | Theme and background color used by the PWA manifest. |
| `VITE_BASE_PATH` | Public base path for Vite assets, HTML icons, TanStack Router, PWA scope, and start URL. |
| `VITE_API_URL` | Main API base URL. |
| `VITE_API_SOCKET_URL` | WebSocket URL. |
| `VITE_CORE_URL` | Core domain value used by the app. |
| `VITE_AVAILABILITY_COOKIE_NAME` | Cookie name used for auth availability checks. |
| `VITE_NODE_ENV` | One of `prod`, `dev`, `test`. Controls the robots meta. |
| `VITE_QUERY_STALE_TIME` | Default TanStack Query stale time in milliseconds. |
| `VITE_BUILD_INFO_EXPIRATION_TIME` | Build info expiration value used by environment configuration. |
| `VITE_PORT` | Local Vite dev server port. |
| `VITE_OUTPUT_DIR` | Build output directory. |

`VITE_NODE_ENV` must be one of the three values above. Anything else fails the build
on purpose.

The application version is not an env variable. Vite reads `version` from
`package.json` and exposes it to the bundle as `__APP_VERSION__`, so it always matches
the released version.

## Project Structure

```text
src/
  app.tsx                     Application provider tree
  main.tsx                    React entry point and service worker bootstrap
  classes/
    class-sw/                 Service worker lifecycle helper
  components/                 Shared UI components
  contexts/                   React context providers and hooks
  core/
    consts/                   Shared constants
    envs/                     Environment variable mapping
    functions/                Shared utility functions
    i18n/                     i18next setup
    logger/                   Logging helper
    query/                    TanStack Query client
    router/                   TanStack Router setup
    types/                    Shared TypeScript types
  layouts/                    Root, router, public, private, and error layouts
  pages/                      Public and private route pages
```

Public assets are stored in `public/`.

Localization files are stored in:

```text
public/locales/en/translation.json
public/locales/ru/translation.json
```

Robots is a single file at `public/robots.txt`.

## Routing

Routing is configured with TanStack Router in `src/core/router/router.tsx`.

Current route groups:

- `/pu` for public routes
- `/pu/home` for the public home page
- `/pr` for private routes
- `/pr/home` for the private home page

The root route redirects unknown routes to the public route group. The public and private route groups redirect their base paths to their home pages.

## Providers

The app-level provider tree is defined in `src/app.tsx`.

It includes:

- screen width provider
- language provider
- error boundary layout
- TanStack Query provider
- permission provider
- geolocation provider
- dialog provider
- PWA provider
- router layout

## Localization

i18next is initialized in `src/core/i18n/index.ts`.

The app supports language-only detection and loads translations from:

```text
/locales/{{lng}}/{{ns}}.json
```

Supported languages are configured in `src/core/consts/index.ts`.

When adding a language:

1. Add the language metadata to `OBJECT_LANGUAGE`.
2. Add a new translation file under `public/locales/<lng>/translation.json`.
3. Keep translation keys aligned across all locale files.

## PWA

PWA support is configured in `vite.config.ts` through `vite-plugin-pwa`.

The service worker helper is implemented in `src/classes/class-sw/index.ts` and exposed to React through `ProviderPWA`.

Important behavior:

- Service worker registration is enabled only when `env.mode === 'prod'`.
- The app can detect offline readiness.
- The app can detect available updates.
- The app can reset service worker cache and reload from a clean state.
- New app versions are read from `build-info.txt` under the configured public base path with a cache-busting request when an update is available.

## Icons and Manifest

Application icons are generated by `@jenesei-software/jenesei-plugin-vite`.

Source logo:

```text
public/logos/logo-jenesei-id.png
```

Generated icons are written to:

```text
public/icons/
```

The generated icons are used in both `index.html` and the PWA manifest.

## Robots

`public/robots.txt` is a single static file and is copied as is. It allows
everything:

```text
User-agent: *
Allow: /
```

Indexing is controlled per environment by the `<meta name="robots">` tag that Vite
injects from `VITE_NODE_ENV`:

| `VITE_NODE_ENV` | Meta robots |
| --- | --- |
| `prod` | `index, follow` |
| `dev` | `noindex, nofollow` |
| `test` | `noindex, nofollow` |

Keep the meta robots in sync with the environment you deploy, otherwise a `dev` build
can end up indexable.

## Code Style

Formatting and linting are handled by Biome.

Key conventions:

- TypeScript strict mode is enabled.
- Imports are organized by Biome.
- Use the `@local/*` alias for imports from `src`.
- Keep code comments and in-code instructions in English.
- Keep shared logic in `src/core`.
- Keep route-level UI in `src/pages`.
- Keep layout concerns in `src/layouts`.

Before opening a pull request, run:

```bash
yarn biome:format
yarn check
```

## Build

Create a build:

```bash
yarn build
```

The output directory is controlled by `VITE_OUTPUT_DIR` and defaults to `build`.

## Deployment Notes

- Provide all required `VITE_*` variables for the selected environment.
- Ensure the injected robots meta matches the target environment.
- Publish or generate `/build-info.txt` if the PWA update prompt should display the new version.
- Serve the built app as a single page application with fallback to `index.html`.

## Troubleshooting

If the app starts on an unexpected port, check `VITE_PORT`.

If the app is indexable but should not be, check that `VITE_NODE_ENV` is one of the three allowed values and that the injected robots meta matches it.

If PWA updates do not appear locally, remember that service worker registration is enabled only for `prod` mode.

If translations do not load, check the language code in `OBJECT_LANGUAGE` and make sure the matching file exists in `public/locales/<lng>/translation.json`.
