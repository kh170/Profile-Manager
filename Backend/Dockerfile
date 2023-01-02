FROM node:17-alpine

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]