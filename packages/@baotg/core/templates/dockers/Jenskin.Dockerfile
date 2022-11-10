FROM jenkinsci/jnlp-slave

ENV HELM_VERSION = "v2.16.7"
ENV NODE_VERSION = "setup_14.x"
ENV DOCKER_VERSION = ""

USER root

# Setup the repository
RUN apt-get update \
    && apt-get install -y build-essential \
    && apt-get install -y gcc \
    && apt-get install -y make \
    && apt-get install -y cmake \
    && apt-get install -y ca-certificates \
    && apt-get install -y curl \
    && apt-get install -y gnupg \
    && apt-get install -y lsb-release \
    && apt-get install -y apt-transport-https \
    && apt-get install -y software-properties-common

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs
RUN npm install -g yarn --force
RUN npm --version
RUN yarn --version

# Install Helm
RUN wget https://get.helm.sh/helm-v3.10.0-linux-amd64.tar.gz \
    && tar -xvf helm-v3.10.0-linux-amd64.tar.gz \
    && mv linux-amd64/helm /usr/local/bin \
    && rm helm-v3.10.0-linux-amd64.tar.gz \
    && rm -rf linux-amd64
RUN helm version

# Install docker
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
RUN echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update \
    && apt-get install -y docker-ce \
    && apt-get install -y docker-ce-cli \
    && apt-get install -y containerd.io \
    && apt-get install -y docker-compose-plugin
RUN docker --version

USER jenkins
