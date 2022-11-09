FROM node:14.17.0 as builder
ARG SERVICE_DIR
ARG SERVICE_NAME
WORKDIR /usr/src/app
RUN npm i -g lerna nx

COPY package.json yarn.lock lerna.json tsconfig.json nx.json ./
COPY packages/ ./packages
COPY ${SERVICE_DIR}/${SERVICE_NAME} ./${SERVICE_DIR}/${SERVICE_NAME}

RUN lerna bootstrap
RUN lerna run build

FROM node:14.8.0-alpine as app
ARG SERVICE_DIR
ARG SERVICE_NAME
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .
WORKDIR /usr/src/app/src/${SERVICE_DIR}/${SERVICE_NAME}
EXPOSE 3000
CMD ["npm", "run", "serve"]
