FROM node:20-alpine AS build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY prisma ./prisma
RUN npm ci && npm run db:generate

COPY tsconfig.json .
COPY tsconfig.build.json .
COPY src ./src

RUN npm run build


FROM node:20-alpine AS prod

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY prisma ./prisma
RUN npm ci --omit=dev && npm run db:generate

COPY --from=build /app/dist ./dist

CMD ["npm", "start"]