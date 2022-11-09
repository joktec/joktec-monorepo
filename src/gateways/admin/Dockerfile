FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/admin
WORKDIR /var/www/admin
ADD . /var/www/admin
RUN npm install
RUN npm run build