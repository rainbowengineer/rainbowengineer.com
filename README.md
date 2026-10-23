# rainbowengineer.com

Personal blog built with [Astro](https://astro.build), hosted on Cloudflare (Workers with static assets). Design: "A+C · Gradient used once" (artboards Blog-AC3-Home and Blog-AC3-Project).

## Run it locally

```sh
npm install
npm run dev        # http://localhost:4321, drafts included
npm run build      # static site in ./dist
npm run preview    # serve ./dist
```

Needs Node 22 or newer.

## Where things live

| What | File |
| --- | --- |
| Name, email, GitHub, company link, giscus settings | `src/site.ts` |
| About text | `src/data/about.md` |
| Tools page | `src/data/tools.yaml` |
| Projects | `src/content/projects/<slug>/index.md` plus photos in the same folder |
| Posts and reviews | `src/content/posts/<slug>.md` |
| Colours, type, layout | `src/styles/global.css` |
| Logo | `src/assets/logo.png`; favicons in `public/` |

Anything in `[brackets]` is a placeholder.

## Adding a project

Copy a folder in `src/content/projects/`, rename it (the folder name becomes the URL), and edit the front matter:

```yaml
title: Clean-zone HVAC from a mini-split
number: 1                 # shown as "Project 01"; also sets the order
summary: One sentence for the card and page intro.
status: in-progress       # in-progress | complete | paused
updated: 2026-10-22
accent: lavender          # lavender | pink | peach | teal (label colour)
cover: ./cover.jpg        # card photo, 3:2 crop
coverAlt: What the photo shows
hero: ./hero.jpg          # optional wide photo on the project page
heroAlt: What the photo shows
callouts:                 # optional numbered markers, x/y in % from top left
  - { x: 30, y: 27, label: Evaporator coil }
repo: https://github.com/you/repo   # optional; enables the Files links
license: MIT                        # optional
buyUrl: https://stasis-systems.com/...  # optional; shows the "Want one?" block
draft: true                         # optional; hidden from the live site
```

The body uses the template headings `## What it is`, `## Why I built it`, `## How it works`, `## What went wrong`. Every `##` heading appears in "On this page"; the Files section is added automatically from `repo`.

Photos: `![alt text](./photo.jpg)` followed on the next line by `*Caption*` becomes a captioned figure. Wrap several in `<div class="figures">` (blank line after the opening tag and before the closing one) for a side-by-side grid.

## Posts

`src/content/posts/example-review.md` is a draft template that only shows in `npm run dev`. The Posts link in the nav appears automatically once a non-draft post exists. Projects and posts both go into `/rss.xml`.

## Comments (giscus)

1. Make the repo public and turn on Discussions (Settings → Features).
2. Install the giscus app: https://github.com/apps/giscus
3. Fill in https://giscus.app with the repo, mapping "pathname", category "Comments" (create it as an Announcement-type category so only you and giscus can start threads).
4. Copy `data-repo`, `data-repo-id`, `data-category` and `data-category-id` into `SITE.giscus` in `src/site.ts`.

Comments stay hidden until those are filled in.

## Deploy (Cloudflare)

Configured in `wrangler.jsonc`: static files from `./dist`, the 404 page for missing URLs, no Worker code.

First time, in the Cloudflare dashboard for the rainbowengineer.com account:

1. Workers & Pages → Create → Import a repository → pick this repo.
2. Build command `npm run build`, deploy command `npx wrangler deploy`.
3. After the first deploy: the Worker → Settings → Domains & Routes → add custom domain `rainbowengineer.com` (and `www.rainbowengineer.com` if wanted).

After that, every push to `main` deploys. Before switching nameservers at Namecheap, copy the Proton mail records (MX, SPF, DKIM, DMARC) into Cloudflare DNS.

## License

The site's code is under the GPL-3.0 license in `LICENSE`. Each project's own files carry their own license in their repo.

## Privacy

No analytics, no cookies, fonts self-hosted. The only third-party request is giscus on pages with comments, once enabled.
