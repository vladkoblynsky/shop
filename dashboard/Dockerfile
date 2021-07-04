FROM node:14 as builder
WORKDIR /app
COPY package.json ./
RUN yarn install --network-timeout 1000000
COPY . .
ARG APP_MOUNT_URI
ARG API_URI
ARG STATIC_URL
ARG STOREFRONT_URL
ENV API_URI ${API_URI:-http://localhost:8000/graphql/}
ENV APP_MOUNT_URI ${APP_MOUNT_URI:-/dashboard/}
ENV STATIC_URL ${STATIC_URL:-/dashboard/}

ENV STOREFRONT_URL ${STOREFRONT_URL}
RUN STATIC_URL=${STATIC_URL} API_URI=${API_URI} APP_MOUNT_URI=${APP_MOUNT_URI} STOREFRONT_URL=${STOREFRONT_URL} yarn run build

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /app/
