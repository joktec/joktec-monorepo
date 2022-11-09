FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/interview
WORKDIR /var/www/interview
ADD . /var/www/interview
RUN npm install
RUN npm run build