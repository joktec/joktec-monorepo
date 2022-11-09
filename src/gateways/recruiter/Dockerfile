FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/recruiter-gw
WORKDIR /var/www/recruiter-gw
ADD . /var/www/recruiter-gw
RUN npm install
RUN npm run build