FROM node:slim
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 8000
CMD ["npx", "nodemon", "server.js"]
