# Portfolio · Selim Jabnoun

Personal site: projects, experience, skills and contact. Static site, no framework and no build step: Vercel (or any static host) serves it as is.

## Structure

```
index.html          Page shell (SEO meta, layout, project panel)
css/styles.css      All styles. Colors, font and sizes are variables in :root
js/data.js          ALL THE CONTENT: profile, projects, experience, skills, links
js/app.js           Rendering and navigation (no need to touch it to edit content)
assets/photo.jpg    Profile photo
assets/cv.pdf       CV
assets/projects/    Optional project images (16:9)
assets/fonts/       Self-hosted Inter font
vercel.json         Vercel config (clean URLs)
```

## Editing content

Everything lives in `js/data.js`:

- **Add a project**: copy a block in `projects`, give it a unique `id` and a `cat` (`travail`, `apprentissage` or `fun`). Counters and tabs update automatically.
- **Hide a project** without deleting it: `hidden: true`.
- **Links**: `links: { github: "https://…", demo: "https://…" }`.
- **Image**: `image: "assets/projects/name.jpg"`.
- **Featured project** on the home view: `person.now`.
- `*text*` is rendered in the accent color.

## Shareable links

Each view and each project has its own URL: `/#presentation`, `/#projets`, `/#projets/pricer`, `/#parcours`, `/#competences`, `/#contact`.

## Run locally

Open `index.html`, or serve the folder:

```bash
npx serve .
```

## Deploy

Import the repository in Vercel (Framework preset: Other, no build command). Every push to `main` redeploys the site.
