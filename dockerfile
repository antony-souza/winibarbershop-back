FROM node:21.7.1

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8100

CMD ["node", "src/app.ts"]
