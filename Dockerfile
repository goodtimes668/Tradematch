FROM node:20-bookworm-slim AS base

# better-sqlite3 needs these to build/install its native binding
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV DATABASE_PATH=/data/tradematch.db

EXPOSE 3000
CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]
