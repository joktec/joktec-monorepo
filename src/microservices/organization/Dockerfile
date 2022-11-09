FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/organization
WORKDIR /var/www/organization
ADD . /var/www/organization
RUN npm install
RUN npm run build