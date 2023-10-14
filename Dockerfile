FROM node:18
WORKDIR /app
COPY . /app
RUN npm run build
EXPOSE 5000
CMD ["node", "backend/server.js"]
