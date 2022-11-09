FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/cv
WORKDIR /var/www/cv
ADD . /var/www/cv
RUN npm install
RUN npm run build