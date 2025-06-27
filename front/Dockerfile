# Etapa 1: build de la app
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa 2: servir la app con Nginx
FROM nginx:alpine

# Copia el build de React al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Opcional: reemplaza el archivo default de Nginx si querés customizar config
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
