FROM node:20-alpine

WORKDIR /app

COPY . .

WORKDIR /app/apps/github-app

ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server.js"]
