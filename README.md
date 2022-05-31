# VISDOM Configuration storing server for Educational Dashboard

## Deployment instructions

Requirements:

- a running MongoDB instance with read/write credentials for the used database
- Docker and Docker Compose

Instructions:

```bash
cp .env.template .env
# edit file .env with the correct URL for the MongoDB
# and the port number for the configuration storing server

docker-compose up --build -d
```

The configuration storing server will be available at `<HOST_URL>:8898`. The port number can be changed by editing the `docker-compose.yml` file.

## Uninstall instructions

```bash
docker-compose down --remove-orphans
```
