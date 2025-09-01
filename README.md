

# Crossing All Borders Redirect Server

This repo powers extra domain servers for Crossing All Borders Ministry by dynamically generating Netlify-style `_redirects` files. It allows multiple domains to share a single codebase, with per-server redirects controlled by environment variables.

Main website: [crossingallborders.org](https://crossingallborders.org)
Main repo: [github.com/CAB-ADMIN/crossingallborders.org](https://github.com/CAB-ADMIN/crossingallborders.org)

## Purpose

Instead of maintaining separate repos for each domain/server, this project uses Eleventy to build a static redirect server. Redirect rules are stored in JSON files and selected at build time using an environment variable (`SITE_KEY`).

## Tech Stack

- Eleventy (11ty) static site generator
- Node.js for build logic
- JSON for redirect rules
- Netlify-style `_redirects` output

## How It Works

- Each domain/server sets a unique `SITE_KEY` environment variable.
- On build, Eleventy reads the corresponding JSON file from `src/_data/redirects/` and generates the correct `_site/_redirects` file.
- No need for Netlify functions or custom server code.

## Project Structure

- src/
	- _data/redirects/ … per-site redirect rules (JSON)
	- assets/ … static assets (optional)
- .eleventy.js … Eleventy config and dynamic redirect logic
- _site/ … build output (do not edit)
- package.json … scripts and metadata

## Usage

Install dependencies:
```powershell
npm install
```

Build for a specific domain/server:
```powershell
$env:SITE_KEY="siteA"; npx eleventy
```
Replace `siteA` with your site key (see `src/_data/redirects/`).

Deploy the `_site` folder to Netlify or any static host. The correct `_redirects` file will be included.

## Adding Redirects

Add or edit JSON files in `src/_data/redirects/` for each domain/server. Example:
```json
[
	{ "from": "/old-path", "to": "/new-path", "status": 301 }
]
```

## License

See repository.

## Project Structure

- src/
	- _includes/ … Nunjucks layout 
	- assets/
		- css/ … global styles and section styles
		- js/ … site scripts
- _site/ … build output (do not edit)
- .eleventy.js … Eleventy config
- package.json … scripts and metadata

## Development

Prerequisites: Node.js 18+ (LTS recommended)

Install:
```powershell
npm install
```

Run locally (serve with live reload):
```powershell
npx @11ty/eleventy --serve
```

Build for production:
```powershell
npx @11ty/eleventy
```

Recommended package.json scripts:
```json
{
	"scripts": {
		"start": "eleventy --serve",
		"build": "eleventy",
	}
}
```

## Deployment

- Build: `npx @11ty/eleventy`
- Deploy the `_site` folder to any static host (Netlify, GitHub Pages, Cloudflare Pages, S3, etc.).
- Because of cache busting, users receive updated assets immediately on each deploy.

## Contributing

Single-developer project maintained for a non-profit. Open issues or PRs for suggestions and fixes.

## License

See repository
