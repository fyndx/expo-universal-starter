FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
# Copy workspace root files first
COPY package.json bun.lock ./
COPY packages/ ./packages/

# Copy server app files
COPY apps/server/package.json ./apps/server/
COPY apps/server/src ./apps/server/src
COPY apps/server/prisma ./apps/server/prisma
COPY apps/server/tsconfig.json ./apps/server/

RUN bun install

# Change to server directory for build
WORKDIR /app/apps/server

ENV NODE_ENV=production

# Generate Prisma client
RUN bun prisma generate --no-engine

RUN bun build \
	--compile \
	--bytecode \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/apps/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000