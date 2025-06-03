FROM node:24-slim AS builder

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./

RUN npm install --frozen-lockfile || yarn install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:24-slim AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start", "--", "-p", "3000"]