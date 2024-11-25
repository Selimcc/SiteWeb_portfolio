const express = require('express');
const client = require('prom-client');
const app = express();

// Créer un registre pour les métriques
const register = new client.Registry();

// Ajouter les métriques par défaut
client.collectDefaultMetrics({
    app: 'portfolio-monitoring',
    prefix: 'portfolio_',
    timeout: 10000,
    register
});

// Créer des compteurs personnalisés
const pageViews = new client.Counter({
    name: 'portfolio_page_views',
    help: 'Number of page views',
    labelNames: ['page']
});

const contactFormSubmissions = new client.Counter({
    name: 'portfolio_contact_form_submissions',
    help: 'Number of contact form submissions'
});

register.registerMetric(pageViews);
register.registerMetric(contactFormSubmissions);

// Endpoint pour les métriques
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Démarrer le serveur
const port = process.env.PORT || 9091;
app.listen(port, () => {
    console.log(`Serveur de métriques démarré sur le port ${port}`);
});
