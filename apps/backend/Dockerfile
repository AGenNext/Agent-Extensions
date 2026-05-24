FROM node:20-alpine

WORKDIR /app

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

ENV PORT=3100

EXPOSE 3100

CMD ["node", "server.js"]
