# Fase de construcción
FROM node:21 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Fase de despliegue
FROM nginx:alpine
COPY --from=build /app/dist/jineteapp-front /usr/share/nginx/html
