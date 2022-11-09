FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/chat
WORKDIR /var/www/chat
ADD . /var/www/chat
RUN npm install
RUN npm run build