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


FROM node AS runner

ARG target

WORKDIR /app
ENV NODE_ENV production

RUN npm i -g @nrwl/next

COPY --from=build /app/dist/apps/${target} ./

EXPOSE 80

ENV PORT 80
CMD ["npx", "next", "start"]