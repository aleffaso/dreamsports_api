FROM node:16.13

WORKDIR /app

ADD package.json /app

RUN npm install

ADD . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
