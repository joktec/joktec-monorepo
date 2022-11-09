FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/activity
WORKDIR /var/www/activity
ADD . /var/www/activity
RUN npm install
RUN npm run build