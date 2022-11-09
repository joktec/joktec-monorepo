FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/job
WORKDIR /var/www/job
ADD . /var/www/job
RUN npm install
RUN npm run build