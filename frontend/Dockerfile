# ==============================
# 1. Build stage
# ==============================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==============================
# 2. Production stage
# ==============================
FROM node:22-alpine AS production

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001



COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3001

CMD ["node", "server.js"]
