FROM node:16

# RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --verbose

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]