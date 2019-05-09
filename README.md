# ola_frontend

> My doozie Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


## Docker

``` bash
# build docker image
$ docker build -t my-frontend-image .

# run docker container
$ docker run --env API_URL=http://api.backend.com my-frontend-image
```

## Deployment
#### Deploy process:
1) on every new commit to this repository, gitlab start new pipeline based pon .gitlab-ci.yml configuration  
All external variables, like ssh-keys and API_HOST, configured in CI/CD section of this repository GitLab settings  

2) pipeline execute ansible-playbook command and apply ansible playbook defined in ansible-docker-compose.yml  
Note: server already pre-configured by ola-infra repository

3) ansible run docker-compose.server.yml based environment
HTTPS + force-https (automaticy redirect http to https) support already provided by ola-infra repository:  
[traefik](https://traefik.io/) - a reverse proxy with automatically generate and renew Let's Encrypt SSL certificates.  

#### docker-compose.server.yml:  
docker-compose file contains following  
services:  
* frontend - ola_frontend container  

networks:
* lb - external docker network provied by ola-infra repository


