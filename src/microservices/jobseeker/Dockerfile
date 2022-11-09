FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/jobseeker
WORKDIR /var/www/jobseeker
ADD . /var/www/jobseeker
RUN npm install
RUN npm run build