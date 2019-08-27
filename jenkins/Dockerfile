FROM jenkins/jenkins:lts

USER root

ARG GRADLE_VERSION=4.1
ARG NODE_VERSION=10.10.0
ARG NVM_VERSION=0.33.4

# Jenkins supports git, gradle, sonarqube scanner, docker, node installations through plugins
# Dockerfile for more of a Infrastructure as code approach and without having to worry about config changes through Jenkins versions

# Install google chrome (headless) for karma or setup remote karma runner with selenium hub chrome
#   wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - &&\
#   echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list &&\
#   apt-get install google-chrome-stable

RUN apt-get update &&\
  # bash, fish, perl for scripts, jq for parsing curl API responses, ffmpeg for protractor video
  apt-get install -y bash fish unzip jq perl libjson-perl ffmpeg &&\
  # Install nvm
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v${NVM_VERSION}/install.sh | NVM_DIR=/opt/.nvm sh &&\
  . ~/.profile &&\
  # Configuring Content Security Policy, Timezone
  sed -i "s/-jar/-Djava.awt.headless=true -Dorg.jenkinsci.plugins.durabletask.BourneShellScript.HEARTBEAT_CHECK_INTERVAL=36000 -Dhudson.model.DirectoryBrowserSupport.CSP=\"default-src 'self' 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; font-src *; connect-src *; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline' 'unsafe-eval' *;\" -Dorg.apache.commons.jelly.tags.fmt.timeZone=America\/Chicago -jar/g" /usr/local/bin/jenkins.sh &&\
  # SSH keys
  mkdir -p /var/jenkins-files &&\
  # Install gradle
  mkdir -p /opt/gradle &&\
  wget -q https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip &&\
  unzip -qq -d /opt/gradle gradle-${GRADLE_VERSION}-bin.zip &&\
  ln -s /opt/gradle/gradle-${GRADLE_VERSION}/bin/gradle /usr/local/bin/gradle &&\
  # Install node and npm
  nvm install ${NODE_VERSION} &&\
  ln -s /opt/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/local/bin/node &&\
  ln -s /opt/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/local/bin/npm &&\
  # Install node-gyp
  npm install -g node-gyp &&\
  npm install -g node-pre-gyp &&\
  echo "NODE_OPTIONS=--max_old_space_size=6144" >> /etc/environment