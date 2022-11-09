FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/lucky-spin
WORKDIR /var/www/lucky-spin
ADD . /var/www/lucky-spin
RUN npm install
RUN npm run build