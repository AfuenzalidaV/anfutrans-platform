# ==================================
# STAGE 1: Dependencies
# ==================================
FROM node:18-alpine AS deps

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && \
    npm cache clean --force

# ==================================
# STAGE 2: Builder
# ==================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY angular.json ./

# Instalar todas las dependencias
RUN npm ci

# Copiar código fuente
COPY src ./src/
COPY public ./public/

# Build de producción
RUN npm run build -- --configuration production

# ==================================
# STAGE 3: Runner (Nginx)
# ==================================
FROM nginx:1.25-alpine AS runner

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar build de Angular
COPY --from=builder /app/dist/anfutrans-frontend /usr/share/nginx/html

# Crear usuario no-root
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginx -u 1001 && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Crear PID file con permisos
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Exponer puerto 80
EXPOSE 80

# Cambiar a usuario no-root
USER nginx

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
