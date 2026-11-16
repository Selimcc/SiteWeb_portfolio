# Portfolio

My personal site: projects, skills and a contact form. Bilingual (French and English) with a light and dark theme.

**Live:** https://selimcc.github.io/SiteWeb_portfolio/

## Features

- French / English switch without reloading, kept in sync for every text and form placeholder
- Light and dark theme
- Expandable project cards with links to the code and live demos
- Contact form sent with EmailJS and protected by reCAPTCHA
- Cookie consent banner and policy
- Optional monitoring stack (`monitoring/`): an Express server exposing Prometheus metrics (page views, form submissions), Prometheus, Grafana and node-exporter in Docker Compose

## Run it

It is a static site: open `index.html`, or serve the folder:

```bash
npx serve .
```

Monitoring (optional):

```bash
npm install && npm start                # metrics server
cd monitoring && docker compose up -d   # Prometheus :9090, Grafana :3000, node-exporter :9100
```

## Stack

HTML, CSS, vanilla JavaScript, EmailJS, reCAPTCHA, Font Awesome; Node.js, Express, prom-client, Prometheus and Grafana for monitoring.

## Contact

Selim Jabnoun · [LinkedIn](https://www.linkedin.com/in/selim-jabnoun-138aa9248) · selimjabnoun039@gmail.com
