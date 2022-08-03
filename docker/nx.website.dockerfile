FROM node as build

ARG target

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

COPY . .
RUN npx nx build ${target} --configuration=production

FROM nginx
ARG target

COPY --from=build /app/dist/apps/${target} /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/nginx.conf