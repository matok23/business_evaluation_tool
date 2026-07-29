FROM node:24-bookworm-slim AS base

WORKDIR /app


# Install development and production dependencies
FROM base AS dependencies

COPY package.json package-lock.json ./

RUN npm ci


# Compile the TypeScript application
FROM dependencies AS build

COPY . .

RUN npm run build


# Final production image
FROM base AS production

WORKDIR /app

ENV NODE_ENV=production

# Adonis creates a standalone application in /build
COPY --from=build /app/build ./

# Install only runtime dependencies
RUN npm ci --omit=dev \
    && npm cache clean --force

COPY docker-entrypoint.js ./docker-entrypoint.js

EXPOSE 10000

CMD ["node", "docker-entrypoint.js"]