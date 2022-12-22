FROM node:14

WORKDIR /app/nestjs

COPY package*.json ./

COPY ./dist/apps/authentification-service/ ./

EXPOSE 3334

RUN yarn install --production

CMD node main.js

