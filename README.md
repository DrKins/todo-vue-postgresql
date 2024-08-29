# todo-vue-postgresql

Small Vue project, CRUD Todo app. Implemented Repository architecture with Node, Express and Postgresql.

## Project Setup

You need to create .env in root folder and include credentials in order to connecto local database

```
DB_USER=
DB_HOST=localhost
DB_NAME=
DB_PASSWORD=
DB_PORT=5432
```

After succesfully creating local database and passing creds, next steps are usual.<br />
Please note, you need to start both node server and serve vue app.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
npm run dev-node
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
