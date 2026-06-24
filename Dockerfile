FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Dev target for backend/api
FROM base AS api-dev
EXPOSE 3333
CMD ["npm", "run", "dev"]

# Dev target for frontend/web
FROM base AS web-dev
EXPOSE 5173
CMD ["npm", "run", "web"]
