# Conventions de code

## Fichiers

- `kebab-case` (doc de Next.js)

## Variables, fonctions

Nommés selon leur rôle, en `camelCase`, par ex. :

- server action : `createTask()` dans fichier `app/actions/create-task.js`
- appel API : `projectsCreate()` dans fichier `app/lib/api-bridge.js` (méthode HTTP POST)
- récupération de la session depuis le cookie : `getSessionCookie()` dans fichier `app/lib/get-session-cookie.js`

## Composants React (fonctions)

Nommés selon leur rôle, en `PascalCase`, par ex., pour le dashboard :

- `LayoutUi`
  - `Header`
  - `Dashboard`
    - `TaskListItem`
    - `TaskKanbanItem`
    - `ProjectCreateModal`
  - `Footer`

## ESLint

- Point-virgule en fin d'instruction.
- Double quotes pour les chaines de caractères.
- Pas de variables non utilisées.
- `npm run lint`
- `npm run lint:fix`
  
## Commentaires

- *JSDoc* partout.
- Dans le code source si besoin.