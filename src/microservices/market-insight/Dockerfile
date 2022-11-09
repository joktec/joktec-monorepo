FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/market-insight
WORKDIR /var/www/market-insight
ADD . /var/www/market-insight
RUN npm install
RUN npm run build