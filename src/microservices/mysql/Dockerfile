FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/mysql
WORKDIR /var/www/mysql
ADD . /var/www/mysql
RUN npm install
RUN npm run build