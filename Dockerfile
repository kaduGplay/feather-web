FROM node:20

WORKDIR /usr/src/featherhost-app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]