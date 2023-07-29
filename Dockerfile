FROM node:18.12.1-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]