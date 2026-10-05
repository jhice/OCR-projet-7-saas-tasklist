# Notes

## Questions

- ~~on est censé avoir vu~~ Next.js =>
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

## Todo

- ~~Q : voir une tâche = modifier une tâche ?~~
  - ~~lien "voir tâche" => modale ou renvoi vers projet#task-24df2g4sd2fg4s2df4g6sd54~~
    - ~~`.task:target { background-color: yellow; }` (ciblé par un lien #)~~
- ~~register : gérer si user déjà existant (voir api.js)~~
- React possible => document.getElementById(e.currentTarget.dataset.modalOpen);
  - checker le state avant le rendu !
  - pour l'écoute sur le body, privilégier un overlay invisible derrière le bouton
  - OU gérer via le contexte une écoute depuis le layout
- ~~projects :~~
  - ~~tâches terminées~~
  - ~~pourcentage complété~~
  - ~~A FAIRE (traitement front)~~
  - ~~affiche propriétaire~~
    - ~~idem project detail~~
  - tâches : vue calendrier ? STANDBY
- ~~API : **commentaires** présents sur `projects/id/tasks` mais pas sur `projects/id`~~
  - ~~voir les **composants sur la maquette Figma**~~
  - [x] ~~**ajouter un commentaire**~~
- ~~**form errors : messages en anglais**~~
  - ~~account edit : changer mot de passe que si présent~~
- ~~**nav : sous-menu pour "mon compte" et "déconnexion"**~~
- [x] ~~**supprimer une tâche**~~
- ~~forms~~
  - ~~usage de pending~~
  - ~~undefined en second argument de useActionState ?~~
  - ~~edit task : date qui reste "en cours de modification" dans les modales suivantes~~
  - ~~**forms mappés sur un state ?** (pour conserver les saisies)~~
- ~~liste des users ?~~
  - [x] ou ~~**ajouter un contributeur via email**~~
  - [x] ~~l'**API update projects ne semble pas gérer les contributeurs**~~ (`projectRoutes.ts:40`)
    - SI : ~~DELETE /projects/:id/contributors/:userId~~ `projectController.ts:630`
- ~~projet : **proprio non visible**~~
- WIP routes API : mettre des try/catch là où c'est nécessaire
- ~~**gestion des rôles**~~
  - ~~masquer l'UI sur permissions~~
- ~~supprimer projet~~
- [x] ~~account : **changement de mot de passe ?**~~
  - `P@ssword123`
  - `P@ssword456`
- ~~Balises ARIA, accessibilité~~
- ~~mot de passe connexion : ne pas indiquer les contraintes (utiliser un autre validator)~~
- bonus : ajouter des notifs de mise à jour (flash messages)

## Revoir

- MembersField
- AssigneesField
- 