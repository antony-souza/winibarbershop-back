FROM ubuntu:latest

RUN apt-get update && apt-get install -y git && apt-get install npm

WORKDIR /app

RUN git clone https://github.com/antony-souza/winibarbershop-back.git

CMD ["/bin/bash"]
