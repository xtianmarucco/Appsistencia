# Usa una imagen oficial de Node
FROM node:20

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos de dependencias primero para aprovechar la cache de Docker
COPY package*.json ./

# Instala las dependencias (solo producción si querés optimizar para prod)
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto (ajustalo si usás otro)
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["node", "server.js"]
