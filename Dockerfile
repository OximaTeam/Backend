FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci --legacy-peer-deps

COPY src ./src
COPY prisma ./prisma

RUN npx prisma generate

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE ${BACK_PORT}

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npm run seed:prod && npm run start:prod"]