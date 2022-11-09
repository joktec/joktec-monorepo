FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/candidate
WORKDIR /var/www/candidate
ADD . /var/www/candidate
RUN npm install
RUN npm run build