FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
# Copy workspace root files first
COPY package.json bun.lock ./
COPY packages/ ./packages/

# Copy backend app files
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend/src ./apps/backend/src
COPY apps/backend/prisma ./apps/backend/prisma
COPY apps/backend/tsconfig.json ./apps/backend/
COPY apps/backend/.env ./apps/backend/

RUN bun install

# Change to backend directory for build
WORKDIR /app/apps/backend

ENV NODE_ENV=production

# Generate Prisma client
RUN bun prisma generate --no-engine

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/apps/backend/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000