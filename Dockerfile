FROM node:16.13.0-alpine3.12

RUN mkdir -p /usr/local/blog && chown -R node:node /usr/local/blog

WORKDIR /usr/local/blog

COPY --chown=node:node . .

# COPY package.json package-lock.json ./

USER node

RUN npm ci

EXPOSE 3000