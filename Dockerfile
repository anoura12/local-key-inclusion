FROM node:alpine

RUN apk add build-base zlib-dev autoconf automake nasm libtool libpng-dev jpeg-dev g++ gcc libgcc libstdc++ linux-headers make python3

RUN mkdir /app

COPY package.json /app
COPY yarn.lock /app
WORKDIR /app
RUN yarn install

WORKDIR /app
COPY . /app
RUN yarn build
RUN mv sample-README.md README.md
EXPOSE 3000

CMD ["yarn","run"]
