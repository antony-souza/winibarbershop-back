FROM ubuntu:lasted

WORKDIR /app

RUN apt-get update && apt-get install git

WORKDIR /app

RUN git clone https://github.com/antony-souza/winibarbershop-back.git

WORKDIR /app/winibarbershop-back/

RUN npm install

EXPOSE 80
EXPOSE 8100

CMD ["npm","start"]