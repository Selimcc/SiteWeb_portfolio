/* ============================================================
   CONTENU DU SITE — c'est le seul fichier à modifier au quotidien.
   - Ajouter un projet : copie un bloc dans `projects` et change les valeurs.
   - `cat` doit correspondre à un id de `categories`.
   - `hidden: true` masque un projet sans le supprimer.
   - Au-delà de 6 projets, une catégorie est paginée automatiquement.
   - `image` (optionnel) : "assets/projects/mon-projet.jpg", format 16:9.
   - `links` (optionnel) : { github: "https://…", demo: "https://…" }.
   - Dans les textes, *mot* s'affiche dans la couleur d'accent.
   ============================================================ */
window.SITE = {
  person: {
    name: "Selim Jabnoun",
    title: "Futur ingénieur Cloud & IA",
    status: "En alternance chez Amerigo Group",
    photo: "assets/photo.jpg",
    cv: "assets/cv.pdf",
    email: "selimjabnoun039@gmail.com",
    linkedin: "https://www.linkedin.com/in/selim-jabnoun",
    github: "https://github.com/Selimcc",
    location: "Maisons-Laffitte",
    meta: [
      { icon: "pin",   text: "Maisons-Laffitte · mobile Île-de-France et international" },
      { icon: "award", text: "Certifié AWS Solutions Architect et Terraform" },
      { icon: "globe", text: "Français · Anglais (TOEIC 920) · Arabe" }
    ],
    headline: "Je conçois et déploie des solutions data et IA {rotate}.",
    rotate: ["dans le cloud", "pour la logistique", "en production"],   // mots qui défilent dans l'accroche
    now: "amerigo",                      // id du projet mis en avant sur la page Présentation
    featured: ["rag-slack", "shred", "diabete"],   // projets phares affichés sur la page Présentation
    availability: [
      { label: "Recherche", value: "CDI en data, IA ou cloud" },
      { label: "Disponible", value: "À partir de janvier 2028" },
      { label: "Mobilité", value: "Île-de-France et international" },
      { label: "Actuellement", value: "Alternance chez Amerigo Group" }
    ],
    stats: [
      { value: "2", label: "Certifications AWS et Terraform" },
      { value: "{projects}", label: "Projets présentés" },   // calculé automatiquement
      { value: "920", label: "Score TOEIC" },
      { value: "Janv. 2028", label: "Disponible en CDI" }
    ]
  },

  categories: [
    { id: "travail",       label: "Travail",       desc: "Alternance, stages en entreprise et projets d'école." },
    { id: "apprentissage", label: "Apprentissage", desc: "Projets personnels menés pour apprendre une technologie en construisant un vrai produit." },
    { id: "fun",           label: "Passion",       desc: "Projets menés par plaisir, souvent avec des amis : jeux vidéo, musique, IA créative." }
  ],

  projects: [
    /* ---------- TRAVAIL ---------- */
    {
      id: "amerigo", cat: "travail", status: "En cours", year: "2026 – 2027",
      title: "Logistique pilotée par la donnée",
      where: "Alternance · Amerigo Group",
      tagline: "Des données ERP aux décisions : modéliser les flux de l'entrepôt, de la commande à la livraison.",
      context: "C'est ma mission d'alternance et mon projet de fin d'études. L'objectif est de transformer les flux logistiques grâce à la donnée et à des algorithmes d'aide à la décision.",
      did: [
        "J'analyse et je consolide les données issues de l'ERP Infor M3.",
        "Je modélise les flux, de la commande client jusqu'à la livraison.",
        "Je construis des tableaux de bord Power BI pour le suivi de l'activité.",
        "J'intègre des algorithmes d'aide à la décision à l'outil de production interne, dont une cartographie 3D de l'entrepôt."
      ],
      learned: "Un bon outil se conçoit sur le terrain, avec les équipes qui vont s'en servir.",
      stack: ["Infor M3", "Power BI", "Python", "SQL"],
      links: {}
    },
    {
      id: "rag-slack", cat: "travail", status: "Terminé", year: "Janv. – Avr. 2025",
      title: "Assistant RAG sur Slack",
      where: "Stage · Devoteam",
      tagline: "Un assistant Slack qui répond aux questions des équipes à partir de la documentation interne, avec Amazon Bedrock.",
      context: "C'était mon premier stage chez Devoteam, partenaire AWS, à Levallois-Perret. Le but : rendre la documentation interne interrogeable directement depuis Slack.",
      did: [
        "Deux fonctions Lambda automatisent l'extraction des documents internes via l'API Outline et leur stockage sur S3.",
        "Les documents sont synchronisés avec une Knowledge Base Amazon Bedrock pour la génération augmentée (RAG).",
        "L'infrastructure est décrite en Terraform modulaire et déployée par CI/CD."
      ],
      learned: "Mettre une IA en production, c'est autant de l'infrastructure que du modèle.",
      stack: ["Amazon Bedrock", "Lambda", "S3", "Terraform", "Python", "GitLab CI/CD"],
      links: {}
    },
    {
      id: "iot-access", cat: "travail", status: "Terminé", year: "Sept. 2025 – Janv. 2026",
      title: "Contrôle d'accès IoT dans le cloud",
      where: "Stage · Devoteam · Serbie",
      tagline: "Une architecture serverless sécurisée pour traiter les événements d'accès remontés par des objets connectés.",
      context: "C'était ma deuxième mission chez Devoteam, cette fois à Novi Sad et Belgrade, en Serbie.",
      did: [
        "J'ai conçu des APIs sécurisées avec API Gateway, Cognito et un Lambda Authorizer.",
        "Les événements sont traités de façon asynchrone via SQS.",
        "Les données sont stockées dans DynamoDB et Aurora PostgreSQL, et supervisées avec CloudWatch.",
        "L'infrastructure Terraform est déployée automatiquement par GitHub Actions."
      ],
      learned: "Concevoir une architecture prête pour la production, en équipe et en anglais.",
      stack: ["API Gateway", "Cognito", "SQS", "DynamoDB", "Aurora", "Terraform", "GitHub Actions"],
      links: {}
    },
    {
      id: "site-vitrine", cat: "travail", status: "En cours", year: "2026",
      title: "Site vitrine pour un client",
      where: "Freelance · Open Solution & Innovation",
      tagline: "Une première version de site vitrine, présentée au client en démo vidéo puis ajustée selon ses retours.",
      context: "Le client voulait présenter son offre clairement en ligne. J'ai livré une première version, puis j'ai fait évoluer le site au fil des échanges.",
      did: [
        "J'ai intégré un site responsive : navigation, lisibilité, formulaire de contact et présentation de l'offre.",
        "J'ai présenté la V1 en démonstration vidéo.",
        "J'ai recueilli les retours du client sur le logo, les couleurs et les modifications souhaitées, puis je les ai intégrés."
      ],
      learned: "Un projet client se réussit autant par l'écoute que par le code.",
      stack: ["HTML / CSS / JS", "Responsive", "UX / UI", "Relation client"],
      links: {}
    },
    {
      id: "diabete", cat: "travail", status: "Terminé",
      title: "Prédiction du diabète",
      where: "Projet PBL · CESI",
      tagline: "Prédire le diabète à partir des 253 680 réponses de l'enquête BRFSS du CDC, avec des réseaux de neurones explicables.",
      context: "C'est un projet d'apprentissage par problème : construire un modèle de classification fiable sur des données de santé déséquilibrées, et pouvoir expliquer ses décisions.",
      did: [
        "J'ai préparé les données : typage métier des variables, 24 206 doublons supprimés, découpage stratifié 70/15/15.",
        "J'ai entraîné et comparé plusieurs architectures MLP, en gérant le déséquilibre des classes et le surapprentissage.",
        "J'ai rendu les prédictions interprétables avec SHAP et LIME.",
        "J'ai travaillé les métriques, la calibration du modèle et les aspects MLOps."
      ],
      learned: "Un modèle de santé doit être juste, mais aussi explicable.",
      stack: ["Python", "TensorFlow / Keras", "MLP", "SHAP", "LIME", "MLOps"],
      links: { github: "https://github.com/Selimcc/diabetes-prediction-deep-learning" }
    },
    {
      id: "leyenda", cat: "travail", status: "En cours", year: "2026",
      title: "Légendage automatique d'images",
      where: "Projet d'équipe · CESI",
      tagline: "Trier, débruiter puis légender automatiquement des images, sans aucun modèle pré-entraîné.",
      context: "C'est un projet d'équipe de l'option Data Science à CESI. La consigne : tout construire nous-mêmes, sans modèle pré-entraîné.",
      did: [
        "J'ai développé le CNN entraîné de zéro et retenu pour le premier livrable : rappel photo de 85,9 % et F1 de 0,783 sur 6 004 images de test.",
        "J'ai mené une étude d'ablation, analysé la courbe d'apprentissage et réalisé un test de McNemar.",
        "J'ai mis en place la suite de tests pytest et la CI GitHub Actions de l'équipe."
      ],
      learned: "Partir de zéro oblige à vraiment comprendre ce qu'on construit, et à le prouver par les métriques.",
      stack: ["Python", "TensorFlow", "Keras", "CNN", "scikit-learn", "pytest"],
      links: {}
    },
    {
      id: "api-capteurs", cat: "travail", status: "Terminé",
      title: "API de normalisation « Données sauvages »",
      where: "Projet de développement · CESI",
      tagline: "Une API REST qui récupère, valide et normalise des données de pollution venant de capteurs aux formats différents.",
      context: "Chaque capteur envoie ses mesures dans son propre format. Il fallait exposer une structure unique et fiable à une interface ou à un client.",
      did: [
        "J'ai conçu une API REST avec Node.js et Express pour collecter les mesures.",
        "Les données sont validées et normalisées avec Mongoose avant d'être stockées dans MongoDB.",
        "L'API renvoie un JSON cohérent, quel que soit le capteur d'origine.",
        "L'environnement est conteneurisé avec Docker et testé avec Postman."
      ],
      learned: "La qualité d'une API se joue sur la validation des données en entrée.",
      stack: ["Node.js", "Express", "MongoDB", "Mongoose", "Docker", "Postman"],
      links: {}
    },
    {
      id: "air-quality", cat: "travail", status: "Terminé",
      title: "Qualité de l'air : architecture Edge/Cloud",
      where: "Projet IoT · CESI",
      tagline: "Surveiller le CO₂, la température et le bruit avec des alertes en local et un historique dans le cloud.",
      context: "Le projet portait sur la surveillance de paramètres de confort dans un bâtiment, avec un choix d'architecture à justifier.",
      did: [
        "Nous avons analysé les besoins et comparé une architecture tout Cloud et une architecture Edge.",
        "Nous avons retenu une approche hybride : la réaction aux alertes se fait en local, au plus près des capteurs.",
        "Les données remontent dans le cloud pour l'historique, les tableaux de bord et les analyses."
      ],
      learned: "Le bon traitement au bon endroit : la latence et le coût guident l'architecture.",
      stack: ["IoT", "Edge computing", "Cloud", "Capteurs", "Temps réel"],
      links: {}
    },
    {
      id: "lora", cat: "travail", status: "Terminé",
      title: "Simulation LoRa et ZigBee",
      where: "Projet réseaux · CESI",
      tagline: "Simuler la réception radio selon la distance, et rendre le modèle de propagation LoRa plus réaliste.",
      context: "L'objectif était de comparer deux technologies radio de l'IoT et de comprendre comment la qualité de réception se dégrade avec la distance.",
      did: [
        "J'ai simulé l'évolution de la réception des paquets en fonction de la distance.",
        "J'ai analysé le RSSI, le SNR et le taux de paquets reçus.",
        "J'ai enrichi le modèle LoRa pour tenir compte des variations de propagation."
      ],
      learned: "Un modèle de simulation n'a de valeur que s'il reste proche du terrain.",
      stack: ["Python", "Simulation", "LoRa", "ZigBee", "RSSI / SNR"],
      links: {}
    },
    {
      id: "pneumonie", cat: "travail", status: "Étude",
      title: "Détection de pneumonie",
      where: "Projet scientifique (ADS) · CESI",
      tagline: "Étudier comment le deep learning peut aider à repérer une pneumonie sur des radiographies pulmonaires.",
      context: "Dans ce projet de démarche scientifique, il fallait définir une problématique, étudier l'état de l'art et proposer une méthodologie, comme pour un article.",
      did: [
        "J'ai posé la problématique et réalisé l'état de l'art des approches de vision par ordinateur en imagerie médicale.",
        "J'ai proposé une méthodologie fondée sur un DenseNet-121 et le transfer learning, et défini les métriques d'évaluation.",
        "J'ai analysé les limites d'un outil d'aide au diagnostic.",
        "J'ai rédigé un rapport scientifique, retravaillé sur cinq versions, et réalisé un poster A0."
      ],
      learned: "En santé, savoir dire ce qu'un modèle ne peut pas faire est aussi important que le reste.",
      stack: ["Deep learning", "Computer vision", "Imagerie médicale", "Recherche bibliographique"],
      links: {}
    },
    {
      id: "routes", cat: "travail", status: "Terminé",
      title: "Optimisation de tournées",
      where: "Projet d'équipe · CESI",
      tagline: "Une approche hybride, entre algorithme génétique et recherche tabou, pour le voyageur de commerce avec contraintes réelles.",
      context: "Il s'agit d'un problème classique de recherche opérationnelle, le TSP, enrichi de contraintes du monde réel.",
      did: [
        "Nous avons combiné un algorithme génétique et une recherche tabou.",
        "La solution gère les fenêtres temporelles et les données incomplètes.",
        "Les itinéraires sont visualisés avec NetworkX, Matplotlib et Plotly."
      ],
      learned: "Une bonne heuristique vaut mieux qu'une solution parfaite qu'on n'obtient jamais.",
      stack: ["Python", "Algorithme génétique", "Recherche tabou", "NetworkX"],
      links: {}
    },
    {
      id: "6wind", cat: "travail", status: "Terminé", hidden: true,
      title: "Gestion clients et licences",
      where: "Application web · 6WIND",
      tagline: "Un portail web pour gérer les clients et les licences logicielles.",
      context: "C'est un MVP réalisé pour 6WIND afin d'améliorer la gestion des clients et des licences.",
      did: [
        "On peut ajouter, modifier et supprimer des licences.",
        "La gestion des rôles utilisateurs est automatisée.",
        "Le backend est en PHP avec MySQL, et le frontend en HTML, CSS et JavaScript."
      ],
      learned: "Livrer un MVP utile rapidement, pour un vrai utilisateur.",
      stack: ["PHP", "MySQL", "JavaScript", "Apache"],
      links: {}
    },
    {
      id: "bioshield", cat: "travail", status: "Terminé", hidden: true,
      title: "BioShield Tex",
      where: "Projet innovation · CESI",
      tagline: "Une alternative aux PFAS pour imperméabiliser les textiles.",
      context: "C'est un projet d'innovation en groupe : imaginer une solution plus propre que les « polluants éternels », et la rendre viable.",
      did: ["J'ai construit le Business Model Canvas.", "J'ai refait entièrement la présentation finale."],
      learned: "Pitcher une idée, c'est autant convaincre que calculer.",
      stack: ["Business model", "Pitch"],
      links: {}
    },
    {
      id: "erp-agents", cat: "travail", status: "Étude de cas", hidden: true,
      title: "Agents IA pour un module ERP",
      where: "Prosit · CESI",
      tagline: "Un module ERP capable de détecter des anomalies sur les commandes, d'anticiper les retards et de recommander des actions.",
      context: "C'est une étude de cas sur le bon usage des agents IA dans un ERP.",
      did: ["J'ai analysé les besoins fonctionnels du module de gestion des commandes.", "J'ai distingué les cas où un agent IA apporte de la valeur de ceux où une règle métier ou un algorithme classique suffit."],
      learned: "L'IA n'est pas toujours la bonne réponse.",
      stack: ["ERP", "Agents IA", "Détection d'anomalies"],
      links: {}
    },
    {
      id: "cats-dogs", cat: "travail", status: "Workshop", hidden: true,
      title: "Chats et chiens par transfer learning",
      where: "Workshop · CESI",
      tagline: "Classifier des images à partir du modèle pré-entraîné InceptionV3.",
      context: "C'est un workshop pédagogique sur le pipeline de transfer learning.",
      did: ["J'ai préparé les images et extrait leurs caractéristiques avec InceptionV3."],
      learned: "Réutiliser un modèle pré-entraîné, et savoir quand le faire.",
      stack: ["Python", "TensorFlow / Keras", "InceptionV3"],
      links: {}
    },
    {
      id: "captioning-workshop", cat: "travail", status: "Workshop", hidden: true,
      title: "Génération de légendes (workshop)",
      where: "Workshop · CESI",
      tagline: "Décrire automatiquement une image avec InceptionV3, un GRU et un mécanisme d'attention de Bahdanau.",
      context: "C'est un workshop sur le jeu de données COCO.",
      did: ["J'ai étudié une architecture encodeur-décodeur avec attention."],
      learned: "Relier vision et langage.",
      stack: ["Python", "TensorFlow / Keras", "GRU", "Attention", "COCO"],
      links: {}
    },
    {
      id: "jakarta", cat: "travail", status: "Terminé", hidden: true,
      title: "Jakarta et les limites planétaires",
      where: "Présentation · CESI",
      tagline: "Les vulnérabilités environnementales de Jakarta : inondations, réchauffement, biodiversité et ressources en eau.",
      context: "C'est un travail de synthèse et de présentation orale à deux voix.",
      did: ["J'ai fait les recherches et structuré la présentation.", "J'ai rédigé un script oral à deux voix."],
      learned: "Vulgariser un sujet complexe.",
      stack: ["Recherche", "Synthèse", "Présentation"],
      links: {}
    },

    /* ---------- APPRENTISSAGE ---------- */
    {
      id: "pricer", cat: "apprentissage", status: "En cours", year: "2026",
      title: "Pricer",
      where: "Projet personnel",
      tagline: "Scanner un produit, voir où il est le moins cher autour de soi et choisir son magasin.",
      context: "Le projet est né d'un problème du quotidien : impossible de savoir simplement où ses courses coûtent le moins cher.",
      did: [
        "API FastAPI sur PostgreSQL / PostGIS, avec recherche géographique indexée (GiST).",
        "Magasins réels importés d'OpenStreetMap, et prix Open Prices importés chaque nuit.",
        "Une photo de ticket de caisse donne tous les prix grâce à l'OCR Tesseract et à une mémoire par enseigne.",
        "Score de confiance, contrôle GPS et détection d'anomalies ; tests sur une vraie base et CI GitHub Actions.",
        "L'app mobile est développée en React Native (Expo)."
      ],
      learned: "Penser un produit de bout en bout : données, API, mobile et qualité.",
      stack: ["FastAPI", "PostgreSQL", "PostGIS", "Tesseract OCR", "React Native", "Docker"],
      links: { github: "https://github.com/Selimcc/Pricer" }
    },
    {
      id: "shred", cat: "apprentissage", status: "En ligne", year: "2026",
      title: "Shred",
      where: "Projet personnel · PWA",
      tagline: "Une application installable pour suivre ses séances et ses repas, avec des rappels et un coach IA.",
      context: "Je voulais un outil qui m'aide à rester régulier à la salle et en cuisine, et qui respecte la vie privée.",
      did: [
        "L'app fonctionne entièrement hors ligne, avec une sauvegarde chiffrée de bout en bout (PBKDF2 + AES-GCM).",
        "J'ai codé les notifications Web Push sans dépendance (VAPID, aes128gcm).",
        "Le coach IA s'appuie sur une recherche BM25 locale et n'envoie au modèle que les extraits utiles.",
        "On y trouve un générateur de programmes et des meal plans, avec 212 tests automatisés et un déploiement sur Cloudflare."
      ],
      learned: "La sécurité et la vie privée se conçoivent dès le départ, pas après.",
      stack: ["React 19", "TypeScript", "Cloudflare Workers", "WebCrypto", "Web Push", "LLM"],
      links: { github: "https://github.com/Selimcc/Shred", demo: "https://selimcc.github.io/Shred/" }
    },
    {
      id: "entrepot-2d", cat: "apprentissage", status: "En cours", year: "2026",
      title: "Plan 2D d'entrepôt depuis un CSV",
      where: "Projet personnel · Logistique",
      tagline: "Transformer un export d'emplacements en plan d'entrepôt lisible : zones, allées, travées et niveaux.",
      context: "C'est un outil Python né de ma découverte de la logistique : rendre visible ce qu'un fichier d'emplacements décrit en lignes de texte.",
      did: [
        "J'ai décodé le format des codes d'emplacement : zone, allée, travée, niveau.",
        "J'ai généré un plan 2D avec les zones de réception, de stockage et d'expédition.",
        "J'ai calculé des distances logistiques entre emplacements."
      ],
      learned: "Visualiser une donnée, c'est souvent le premier pas pour l'optimiser.",
      stack: ["Python", "CSV", "Visualisation", "Logistique"],
      links: {}
    },
    {
      id: "faces", cat: "apprentissage", status: "Terminé", year: "Sept. – Nov. 2024",
      title: "Reconnaissance faciale",
      where: "Projet personnel",
      tagline: "Identifier des visages en temps réel grâce à un réseau de neurones siamois.",
      context: "C'est un projet personnel pour comprendre la vision par ordinateur de bout en bout, de l'entraînement à l'interface.",
      did: [
        "Le modèle siamois compare deux images et mesure leur similarité pour reconnaître une personne.",
        "La modélisation a été faite avec TensorFlow et Keras.",
        "L'interface temps réel est développée avec Kivy."
      ],
      learned: "Les bases de la computer vision, et l'importance de données variées.",
      stack: ["Python", "TensorFlow", "Keras", "Kivy", "Modèle siamois"],
      links: {}
    },
    {
      id: "powerbi", cat: "apprentissage", status: "Terminé",
      title: "Tableau de bord des ventes",
      where: "Data visualisation",
      tagline: "Un tableau de bord Power BI pour suivre les ventes d'une enseigne de commerce de détail.",
      context: "L'objectif était d'aider à identifier les tendances, à suivre les performances et à repérer les zones sous-performantes.",
      did: [
        "J'ai nettoyé et transformé des données brutes issues de fichiers Excel et de bases SQL.",
        "J'ai défini les KPI : revenus mensuels, segmentation client, performance par catégorie.",
        "J'ai construit des visualisations avancées, comme des cartes thermiques et des tendances."
      ],
      learned: "Un bon tableau de bord répond à une question précise.",
      stack: ["Power BI", "SQL", "Data cleaning"],
      links: {}
    },
    {
      id: "trading", cat: "apprentissage", status: "Exploration",
      title: "Bot de trading IA",
      where: "Projet personnel",
      tagline: "Explorer le machine learning pour anticiper les tendances des prix des cryptomonnaies.",
      context: "C'est un projet exploratoire autour des séries temporelles financières.",
      did: [
        "J'ai collecté des données historiques de marché via API.",
        "J'ai entraîné des réseaux LSTM pour prévoir les mouvements de prix.",
        "Prochaines étapes : automatiser les transactions et optimiser le portefeuille."
      ],
      learned: "La prévision de séries temporelles demande beaucoup d'humilité.",
      stack: ["Python", "LSTM", "APIs de marché"],
      links: {}
    },
    {
      id: "robot", cat: "apprentissage", status: "En conception", hidden: true,
      title: "Mini robot de bureau",
      where: "Projet personnel · IoT",
      tagline: "Un robot de 8 cm avec caméra, petite personnalité et retour autonome à sa base de recharge.",
      context: "C'est ma porte d'entrée dans la robotique : un vrai objet physique, modulaire et à petit budget.",
      did: ["J'ai sélectionné des composants abordables.", "Je conçois une coque en impression 3D.", "J'ajoute de la vision pour éviter les obstacles."],
      learned: "Dans le monde physique, chaque millimètre compte.",
      stack: ["IoT", "Électronique", "Impression 3D"],
      links: {}
    },
    {
      id: "gestion-app", cat: "apprentissage", status: "Terminé", hidden: true,
      title: "Mini application de gestion",
      where: "Application desktop",
      tagline: "Une application Windows pour gérer le personnel et les stocks d'une entreprise.",
      context: "Le but était de digitaliser la gestion administrative d'une petite entreprise.",
      did: ["Elle permet de gérer le personnel : ajout, modification, suppression et consultation.", "Elle assure le suivi des stocks.", "Elle repose sur une base MySQL, avec le code versionné sur GitHub."],
      learned: "Structurer une application métier complète.",
      stack: ["C++", ".NET", "Windows Forms", "MySQL"],
      links: {}
    },

    /* ---------- PASSION ---------- */
    {
      id: "neonpad", cat: "fun", status: "En ligne", year: "2026",
      title: "NeonPad",
      where: "Projet personnel",
      tagline: "Une manette PS5, Xbox ou Switch devient une boîte à rythmes néon, directement dans le navigateur.",
      context: "L'idée m'est venue d'une vidéo de beats joués à la manette. Je l'ai construite pour moi, puis je l'ai partagée avec mes amis.",
      did: [
        "Les sons sont synthétisés en temps réel avec la Web Audio API, avec enregistrement de boucles et effets calés sur le tempo.",
        "Les Launchpad et pads MIDI sont pris en charge (Web MIDI, SysEx), ainsi que la barre lumineuse de la manette (WebHID).",
        "L'app tient dans un seul fichier HTML, sans dépendance, et fonctionne hors ligne."
      ],
      learned: "La musique et le code forment mon terrain de jeu préféré.",
      stack: ["JavaScript", "Web Audio", "Gamepad API", "Web MIDI", "Canvas"],
      links: { github: "https://github.com/Selimcc/NeonPad", demo: "https://selimcc.github.io/NeonPad/" }
    },
    {
      id: "marrow", cat: "fun", status: "En développement", year: "2026",
      title: "MARROW",
      where: "Jeu vidéo · titre provisoire",
      tagline: "Un FPS parkour nerveux, où l'on traverse le corps d'un saint géant.",
      context: "C'est mon jeu solo, avec une vraie histoire, en vue d'une sortie sur Steam.",
      did: [
        "Mouvement rapide, ragdolls et physique soignée.",
        "Direction artistique « Bone reliquary » pour l'interface.",
        "Les modèles 3D sont créés dans Blender."
      ],
      learned: "Le ressenti d'un jeu se joue dans les détails.",
      stack: ["Godot 4", "Blender", "Game design"],
      links: {}
    },
    {
      id: "roblox", cat: "fun", status: "Publié", year: "2026",
      title: "Jeux Roblox",
      where: "Avec des amis",
      tagline: "Mix a Critter, mon premier jeu publié, puis Monster Express, un jeu en coopération développé à deux.",
      context: "Je n'avais jamais créé de jeu Roblox. J'en ai publié un, puis j'ai embarqué un ami pour un deuxième.",
      did: [
        "Mix a Critter a été publié en septembre 2026.",
        "Monster Express : on y gère des passagers monstres dans un train de nuit, jusqu'à 4 joueurs en coop.",
        "Nous avons organisé le travail à deux, chacun sur sa partie du code."
      ],
      learned: "Livrer vite, écouter les joueurs et coder en équipe.",
      stack: ["Roblox Studio", "Luau", "Multijoueur"],
      links: {}
    },
    {
      id: "perso-ia", cat: "fun", status: "Expérimentation", year: "2026",
      title: "Personnage IA",
      where: "IA générative",
      tagline: "Un personnage inventé, généré en local, qui reste cohérent d'une vidéo à l'autre.",
      context: "C'est une expérience pour comprendre ce que l'IA générative vidéo sait faire sur une machine personnelle, sans service payant.",
      did: ["Les pipelines de génération tournent en local.", "Je travaille la cohérence du personnage entre les vidéos."],
      learned: "L'IA générative demande autant de méthode que de créativité.",
      stack: ["ComfyUI", "Wan 2.2", "IA générative"],
      links: {}
    },
    {
      id: "bracelet", cat: "fun", status: "Concept",
      title: "Bracelet réveil vibrant",
      where: "Projet DIY",
      tagline: "Un bracelet autonome qui réveille par vibration, sans réveiller toute la pièce.",
      context: "C'est une idée de maker : un objet simple, utile au quotidien, entièrement conçu à la main.",
      did: [
        "J'ai conçu l'architecture : microcontrôleur, moteur vibrant et batterie.",
        "Je choisis les composants et je prépare un boîtier imprimé en 3D.",
        "Le prototype assemblé est la prochaine étape."
      ],
      learned: "Passer d'une idée à un objet demande de penser énergie, taille et confort.",
      stack: ["Électronique", "Microcontrôleur", "Embarqué", "Impression 3D"],
      links: {}
    }
  ],

  journey: {
    experience: [
      { date: "Sept. 2026 – aujourd'hui", title: "Chargé de projet Data & IA (alternance)", org: "Amerigo Group · Puteaux", text: "Logistique pilotée par la donnée : ERP Infor M3, Power BI, algorithmes d'aide à la décision." },
      { date: "Sept. 2025 – Janv. 2026", title: "Stagiaire ingénieur Cloud & IA", org: "Devoteam · Novi Sad & Belgrade", text: "Architecture serverless de contrôle d'accès IoT sur AWS, déployée avec Terraform." },
      { date: "Janv. – Avr. 2025", title: "Stagiaire ingénieur Cloud & IA", org: "Devoteam · Levallois-Perret", text: "Assistant RAG sur Slack avec Amazon Bedrock et Terraform." },
      { date: "En parallèle des études", title: "Développeur web freelance", org: "Indépendant", text: "Sites pour des clients, de la maquette à la mise en ligne." }
    ],
    education: [
      { date: "2024 – 2027", title: "Cycle ingénieur, Big Data & IA", org: "CESI École d'Ingénieurs", text: "5e année en contrat de professionnalisation." },
      { date: "2022 – 2024", title: "Cycle préparatoire intégré", org: "CESI École d'Ingénieurs" },
      { date: "2022", title: "Baccalauréat général", org: "Spécialités Physique-Chimie et NSI" }
    ],
    engagements: [
      { date: "Bénévolat", title: "Bénévole", org: "Croissant-Rouge tunisien", text: "Actions solidaires sur le terrain." },
      { date: "Association", title: "Prothèse imprimée en 3D", org: "CESI Maker", text: "Conception d'une prothèse en impression 3D." }
    ],
    certifications: [
      { title: "AWS Certified Solutions Architect – Associate", org: "Amazon Web Services" },
      { title: "HashiCorp Certified: Terraform Associate", org: "HashiCorp" }
    ],
    skills: [
      { group: "IA & ML", items: ["Apprentissage supervisé et non supervisé", "Deep learning", "Computer vision", "RAG", "Modèles de langage"] },
      { group: "Data & Cloud", items: ["AWS", "Pipelines de données", "SQL / NoSQL", "Power BI"] },
      { group: "DevOps", items: ["Terraform", "GitLab CI/CD", "GitHub Actions", "Docker", "Bash"] },
      { group: "Langages", items: ["Python", "SQL", "JavaScript", "C", "C++", "Bash"] },
      { group: "Soft skills", items: ["Observation", "Communication", "Travail en équipe", "Adaptabilité", "Résolution de problèmes"] },
      { group: "Langues", items: ["Français (natif)", "Anglais (TOEIC 920)", "Arabe (courant)"] }
    ]
  },

  about: {
    summary: [
      "Élève ingénieur en IA & Big Data à CESI (diplôme fin 2027), je suis en alternance chez Amerigo Group, où je mets la donnée au service de la logistique : données ERP, tableaux de bord Power BI et algorithmes d'aide à la décision.",
      "Avant cela, j'ai réalisé deux stages chez Devoteam, partenaire AWS : un assistant RAG sur Amazon Bedrock, puis une architecture serverless déployée avec Terraform en Serbie. Je suis certifié AWS Solutions Architect – Associate et HashiCorp Terraform Associate."
    ],
    approach: [
      { title: "Observer d'abord", text: "Je comprends le terrain et les besoins avant de proposer une solution." },
      { title: "Travailler en équipe", text: "En France comme à l'étranger, en français comme en anglais." },
      { title: "Industrialiser", text: "Tests, CI/CD et infrastructure as code pour des solutions qui durent." }
    ],
    interests: ["DJ et production musicale", "MMA", "Voyages", "Jeux vidéo", "Bénévolat"]
  }
};
