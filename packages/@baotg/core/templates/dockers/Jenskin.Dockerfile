FROM jenkinsci/jnlp-slave

ENV HELM_VERSION = "v2.11.0"
ENV NODE_VERSION = "setup_14.x"
ENV DOCKER_VERSION = ""

USER root

RUN apt-get update \
 && curl -sL https://deb.nodesource.com/${NODE_VERSION} | bash - \
 && apt-get install -y build-essential \
 && apt-get install -y nodejs \
 && apt-get install -y gcc \
 && apt-get install -y make \
 && apt-get install -y cmake \
 && npm install -g yarn --force

RUN wget https://storage.googleapis.com/kubernetes-helm/helm-${HELM_VERSION}-linux-amd64.tar.gz \
 && tar -xvf helm-${HELM_VERSION}-linux-amd64.tar.gz \
 && mv linux-amd64/helm /usr/local/bin \
 && rm -f /helm-${HELM_VERSION}-linux-amd64.tar.gz

RUN apt-get install docker-ce docker-ce-cli containerd.io

USER jenkins
