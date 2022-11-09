FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/blog
WORKDIR /var/www/blog
ADD . /var/www/blog
RUN npm install
RUN npm run build