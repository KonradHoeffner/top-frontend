FROM node:alpine as build-stage
WORKDIR /app
RUN yarn global add @quasar/cli
#ARG NPM_AUTH_TOKEN
#ENV NPM_AUTH_TOKEN=$NPM_AUTH_TOKEN
#COPY package.json yarn.lock .npmrc ./
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN quasar build

FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist/spa /opt/top-frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.d/* /docker-entrypoint.d/
RUN chmod u+x /docker-entrypoint.d/*.sh
RUN sed -i "s|notice|error|" /etc/nginx/nginx.conf

EXPOSE 80
ENV NGINX_ENTRYPOINT_QUIET_LOGS=1
CMD ["nginx", "-g", "daemon off;"]
