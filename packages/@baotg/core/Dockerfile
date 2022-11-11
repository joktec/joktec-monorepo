FROM node:14.8.0-alpine
ARG NPM_TOKEN

RUN apk add build-base && \
    apk add --no-cache python && \
    npm install -g yarn --force && \
    yarn config set registry https://registry.npmjs.org && \
    echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

WORKDIR /app

COPY bin/btg-run-service.sh ./btg-run-service.sh
RUN chmod +x btg-run-service.sh

EXPOSE 9010
EXPOSE 9011
