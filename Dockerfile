FROM node:latest
WORKDIR /shortcut
COPY . .
RUN npm i
RUN npm run client:install
RUN npm run client:build
CMD ["npm", "run", "dev"]
