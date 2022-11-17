FROM node as deps

ARG target

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

FROM node as build

ARG target

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx nx build ${target}



FROM node AS build2

ARG target

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build app/dist/apps/${target}/ .
RUN npm i --cache /tmp/node_cache


FROM node:alpine AS run

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build2 /app .

RUN npm i sharp --cache /tmp/node_cache
RUN rm -r .next/cache
RUN rm -r /tmp

EXPOSE 80
ENV PORT 80
CMD ["npm", "start"]