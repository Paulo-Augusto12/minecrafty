FROM node:22-alpine

WORKDIR /app

copy package*.json ./

RUN npm install

copy . .

CMD ["npm", "run", "dev"]