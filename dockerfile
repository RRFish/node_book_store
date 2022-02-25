FROM mysql
FROM node:14.16-alpine

COPY ./ /usr/src/app
WORKDIR /usr/src/app

RUN npm install

USER 1001
EXPOSE 3001

CMD ["npm", "run", "dev"]