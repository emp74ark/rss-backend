FROM node:22-slim
RUN corepack enable
WORKDIR /app
COPY package*.json .
RUN pnpm install
COPY . .
RUN pnpm run build
CMD ["node", "dist/index.js"]
