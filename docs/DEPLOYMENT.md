# Deployment — GitHub Pages

No Vercel. No backend. No database. No server authentication. The build output
is a folder of static files.

## Configuration already in place

| Item           | Value                           | Where                      |
| -------------- | ------------------------------- | -------------------------- |
| Vite base path | `/Interactive-Geometry-Grade8/` | `vite.config.ts`           |
| Router         | `HashRouter`                    | `src/main.tsx`             |
| Jekyll bypass  | `public/.nojekyll`              | copied to `dist/` on build |
| Workflow       | `.github/workflows/deploy.yml`  | verify → build → deploy    |

### Why `HashRouter`

GitHub Pages serves static files with no rewrite rules. With `BrowserRouter`, a
deep link such as `/lesson/x/step/2` would request a file that does not exist
and return 404. Hash routing keeps every route resolvable from `index.html`
alone, with no `404.html` redirect hack.

Deployed URLs look like:

```
https://<owner>.github.io/Interactive-Geometry-Grade8/#/unit/unit-01
```

### Why `.nojekyll`

Pages runs Jekyll by default, which ignores files and folders beginning with an
underscore. Vite can emit such names. The empty `.nojekyll` file disables Jekyll
entirely.

## Workflow

`.github/workflows/deploy.yml` runs on push to `main`, on pull requests
targeting `main`, and on manual dispatch:

1. **verify** — `npm ci --include=dev`, `typecheck`, `lint`, `test` (incl.
   source fidelity)
2. **build** — `npm ci --include=dev`, `npm run build`, then `configure-pages` +
   `upload-pages-artifact` (pushes and manual dispatches only — pull requests
   stop at verify)
3. **deploy** — `actions/deploy-pages`

### Why devDependencies are required in CI

Each job runs on a fresh runner with an empty `node_modules`, so **every job
that runs npm scripts must install dependencies first** — including `build`.
Omitting the install step there made the post-merge Pages build fail with
missing type definitions for `@testing-library/jest-dom`, `vitest/globals` and
`node`.

`npm run build` is `tsc -b && vite build`. The TypeScript project references
resolve the `types` entries declared in the tsconfig files, and those packages
are all devDependencies:

| Type package                | Provides                             |
| --------------------------- | ------------------------------------ |
| `@types/node`               | `node` types (Vite config, tooling)  |
| `vitest`                    | `vitest/globals` test globals        |
| `@testing-library/jest-dom` | custom matcher types for the DOM API |

Because typecheck is part of the build, a production-only install
(`npm ci --omit=dev`) is not enough — the build fails before Vite ever runs.

Both jobs therefore use `npm ci --include=dev` rather than plain `npm ci`. The
flag is explicit rather than redundant: npm skips devDependencies when the
environment looks production-like (`NODE_ENV=production`, `npm_config_production`
or an inherited `--omit=dev` config). Pinning `--include=dev` makes the install
deterministic regardless of runner or org-level environment settings.

Nothing devDependency-related ships to Pages: the deployed artifact is only the
static `dist/` output.

### Node runtime

CI installs the Node version pinned in [`.nvmrc`](../.nvmrc) (22.22.3).
Node 20 is **not** supported: vitest 5 requires Node ≥ 22.12 and jsdom 30
requires Node ≥ 22.22.2, so the test step fails on older runtimes (this is how
the first run on `main` failed). `package.json` declares the same floor via
`engines.node`, so local runs on an unsupported Node are warned about by npm.

Permissions (`pages: write`, `id-token: write`) and a `pages` concurrency group
are set, so no personal access token is needed.

## ⚠️ Pages is NOT enabled yet — one manual step remains

As requested, GitHub Pages has **not** been enabled via the API. The repository
currently returns `404` for its Pages configuration.

To go live:

1. Repository → **Settings** → **Pages**
2. **Build and deployment → Source**: select **GitHub Actions**
3. Push to `main` (or run the workflow manually via **Actions → Run workflow**)

The site will then publish to
`https://<owner>.github.io/Interactive-Geometry-Grade8/`.

If the repository is ever renamed, update `base` in `vite.config.ts` to match
the new name, or assets will 404.

## Local commands

```bash
npm run dev       # dev server
npm run verify    # typecheck + lint + test + build
npm run preview   # serve dist/ exactly as Pages will
```
