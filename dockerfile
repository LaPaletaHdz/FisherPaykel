# Entorno aislado para la API y Base de Datos SQL [cite: 38]
FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Exponer puertos configurados: 3306 (MySQL) o 1433 (SQL Server) [cite: 51]
EXPOSE 3306
EXPOSE 1433

# Definir entorno de producción para monitoreo [cite: 57]
ENV DD_ENV="production"

CMD ["npm", "start"]
