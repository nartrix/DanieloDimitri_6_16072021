# DanieloDimitri_6_16072021
Project 6 - so pekocko app angular js

### Frontend ###

Pour faire fonctionner le projet, vous devez installer :
- [NodeJS](https://nodejs.org/en/download/) en version 12.14 ou 14.0 
- [Angular CLI](https://github.com/angular/angular-cli) en version 7.0.2.
- [node-sass](https://www.npmjs.com/package/node-sass) : attention à prendre la version correspondante à NodeJS. Pour Node 14.0 par exemple, installer node-sass en version 4.14+.

Sur Windows, ces installations nécessitent d'utiliser PowerShell en tant qu'administrateur.

## Development server

```
cd frontend
npm install 
```

Démarrer `ng serve` pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:4200/. L'application va se recharger automatiquement si vous modifiez un fichier source.

### Backend ###

Installer le backend :

```
cd backend
npm install 
```

Dans le dossier `backend` créer un dossier `images`.

Créer un fichier `.env` en ajoutant les identifiants fournis :

```
DB_ADMIN_USERNAME='your MongoDB id'
DB_ADMIN_PASSWORD='your MongoDB password'
```

Lancer le serveur avec `nodemon server`
