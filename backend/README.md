# Postgres Database

The database for this project is hosted by fly.io. To connect directly through a terminal run:

```bash
flyctl postgres connect -a advancetecllc-db --database inventory_dev
```

The open a connection tunnel to the database port during development run and leave open a terminal with the command:

```bash
flyctl proxy 5432 -a advancetecllc-db
```
