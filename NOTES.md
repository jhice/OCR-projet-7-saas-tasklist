# Notes

## Questions

- on est censé avoir vu Next.js =>
  - https://openclassrooms.com/fr/courses/8710351-creez-une-application-react-avec-next-js
- [Server vs Client](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- modales ~~avec Next.js, [Parallel Routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes#convention) ou bien chaque page gère sa modale + composants ?~~
  - à l'ancienne :)
- ~~même question pour l'Auth : Next native ou comme dans le projet 6 ?~~
  - ~~modifier la logique de CORS du backend ou passer par Next.js proxy ?~~
  - *=> domaine local front ajouté dans index.ts config des CORS*
  - utilisation ~~Pages Router~~ ou App Router ? ...
- ~~génération IA dans le projet : fake ?~~
  - ~~ne pas mettre en place / à voir à lier avec une API IA~~
- voir une tâche = modifier une tâche ?
  - pas plus d'infos à afficher que sur le widget, pas de maquette pour "afficher"

## Todo

- register : gérer si user déjà existant (voir api.js)
- React possible => document.getElementById(e.currentTarget.dataset.modalOpen);
  - checker le state avant le rendu !
- projects :
  - tâches terminées
  - pourcentage complété
  - affiche propriétaire
    - idem project detail
- API : commentaires présents sur `projects/id/tasks` mais pas sur `projects/id`
- form errors : messages en anglais
  - account edit : changer mot de passe que si présent