FROM node:17-alpine

RUN npm install webpack -g

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]
