FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8100
ENV PORT=8100

CMD ["npm", "start"]