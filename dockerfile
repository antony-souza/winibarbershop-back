FROM ubuntu:latest

RUN apt-get update && apt-get install -y git

WORKDIR /app

RUN git clone https://github.com/antony-souza/winibarbershop-back.git

CMD ["/bin/bash"]
