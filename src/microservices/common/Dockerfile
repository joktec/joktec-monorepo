FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/common
WORKDIR /var/www/common
ADD . /var/www/common
RUN npm install
RUN npm run build