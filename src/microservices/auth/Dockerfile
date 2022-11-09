FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/auth
WORKDIR /var/www/auth
ADD . /var/www/auth
RUN npm install
RUN npm run build