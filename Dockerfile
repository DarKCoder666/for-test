FROM node:10-alpine as frontend-builder

WORKDIR /home/frontend-builder
COPY package*.json ./
RUN npm ci

COPY . .
ARG API_URL='http://PLACE_HOLDER_f8e7873ba7c2124fc72101d2216177c0'
RUN npm run build
RUN npm run generate

FROM nginx:mainline-alpine
COPY --from=frontend-builder /home/frontend-builder/dist /var/www
COPY docker/frontend.conf /etc/nginx/conf.d/default.conf

ARG API_URL='http://PLACE_HOLDER_f8e7873ba7c2124fc72101d2216177c0'
ENV PLACEHOLDER_URL ${API_URL}
ENV API_URL ${API_URL}

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
