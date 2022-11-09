FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/jobseeker-gw
WORKDIR /var/www/jobseeker-gw
ADD . /var/www/jobseeker-gw
RUN npm install
RUN npm run build