FROM node:22-slim
RUN corepack enable
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
