#FROM node:14 as builder
#WORKDIR /app
#RUN yarn global add pm2
#COPY package.json ./
#RUN yarn install
#COPY . .
#ARG API_URI
#ENV API_URI ${API_URI:-http://localhost:8000/graphql/}
#ARG GTM_ID
#ENV GTM_ID ${GTM_ID}
#ARG DASHBOARD_URL
#ENV DASHBOARD_URL ${DASHBOARD_URL}
#ARG STOREFRONT_URL
#ENV STOREFRONT_URL ${STOREFRONT_URL}
#ARG SSR_API_URL
#ENV SSR_API_URL ${SSR_API_URL}
#RUN API_URI=${API_URI} GTM_ID=${GTM_ID} DASHBOARD_URL=${DASHBOARD_URL} STOREFRONT_URL=${STOREFRONT_URL} SSR_API_URL=${SSR_API_URL} yarn run next-build-prod
#
#EXPOSE 3000
# Install dependencies only when needed
FROM node:alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG API_URI
ENV API_URI ${API_URI:-http://localhost:8000/graphql/}
ARG GTM_ID
ENV GTM_ID ${GTM_ID}
ARG DASHBOARD_URL
ENV DASHBOARD_URL ${DASHBOARD_URL}
ARG STOREFRONT_URL
ENV STOREFRONT_URL ${STOREFRONT_URL}
ARG SSR_API_URL
ENV SSR_API_URL ${SSR_API_URL}
RUN API_URI=${API_URI} GTM_ID=${GTM_ID} DASHBOARD_URL=${DASHBOARD_URL} STOREFRONT_URL=${STOREFRONT_URL} SSR_API_URL=${SSR_API_URL} yarn run next-build-prod

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app
RUN yarn global add pm2

ENV NODE_ENV production
ARG API_URI
ENV API_URI ${API_URI:-http://localhost:8000/graphql/}
ARG GTM_ID
ENV GTM_ID ${GTM_ID}
ARG DASHBOARD_URL
ENV DASHBOARD_URL ${DASHBOARD_URL}
ARG STOREFRONT_URL
ENV STOREFRONT_URL ${STOREFRONT_URL}
ARG SSR_API_URL
ENV SSR_API_URL ${SSR_API_URL}

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

#CMD ["node_modules/.bin/next", "start"]
