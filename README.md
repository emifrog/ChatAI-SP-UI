# ChatAI-SP UI

Interface utilisateur de l'application ChatAI-SP, une application chatbot full stack, qui répond aux questions et conserve le contexte tout au long de la conversation. Le frontend est construit avec Vue.js 3, utilise Pinia pour la gestion des états, et communique avec une API backend sécurisée par JWT.

## Fonctionnalités

- Interface utilisateur moderne et réactive avec Tailwind CSS
- Authentification JWT avec inscription et connexion utilisateur
- Chat en temps réel avec conservation du contexte
- Gestion d'état avec Pinia
- Navigation sécurisée avec Vue Router



## Dépendances

- **vue** : Framework JavaScript frontend
- **vite** : Serveur de développement et environnement
- **pinia** : Bibliothèque de gestion d'état
- **axios** : Bibliothèque HTTP pour les requêtes API
- **tailwindcss** : Framework CSS
- **vue-router** : Routage pour Vue
- **typescript** : Ajout de types à JavaScript


## Installation

1. Cloner le dépôt
2. Exécuter `npm install`
3. Créer un fichier `.env` dans le répertoire racine et ajouter les variables d'environnement suivantes :

```
VITE_API_URL=http://localhost:5000
```

## Démarrage

```bash
# Mode développement
npm run dev

# Construction pour production
npm run build

# Prévisualisation de la version de production
npm run preview
```

L'application sera accessible à l'adresse http://localhost:3000

## Structure de l'application

- **src/components/** : Composants réutilisables (RegisterForm, NavBar, etc.)
- **src/views/** : Pages de l'application (ChatView, AuthView, etc.)
- **src/stores/** : Stores Pinia pour la gestion d'état (auth, chat)
- **src/router/** : Configuration du routeur Vue avec protection des routes

## Fonctionnalités d'authentification

- Inscription utilisateur avec validation des champs
- Connexion utilisateur avec gestion des erreurs
- Protection des routes pour les utilisateurs non authentifiés
- Stockage sécurisé du token JWT
- Ajout automatique du token aux requêtes API