FROM node:10-alpine

WORKDIR /home/frontend
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV API_URL ""
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 80
EXPOSE 80

CMD [ "npm", "start" ]
