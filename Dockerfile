FROM node:alpine as build-stage
WORKDIR /app
RUN yarn global add @quasar/cli
COPY --from=top-base /base/top-api.tgz /app/top-api.tgz
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN quasar build

FROM caddy:alpine as production-stage
COPY --from=build-stage /app/dist/spa /opt/top-frontend
COPY Caddyfile /etc/caddy/Caddyfile
#COPY docker-entrypoint.d/* /docker-entrypoint.d/
#RUN chmod u+x /docker-entrypoint.d/*.sh

EXPOSE 80
