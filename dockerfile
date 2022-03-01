FROM node:14.16-alpine

COPY ./ /usr/src/app
WORKDIR /usr/src/app

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "dev"]