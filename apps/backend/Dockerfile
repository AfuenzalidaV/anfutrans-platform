# ==================================
# STAGE 1: Dependencies
# ==================================
FROM node:18-alpine AS deps

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/

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
COPY nest-cli.json ./

# Instalar todas las dependencias (incluyendo dev)
RUN npm ci

# Copiar código fuente
COPY prisma ./prisma/
COPY src ./src/

# Generar Prisma Client
RUN npx prisma generate

# Build de la aplicación
RUN npm run build

# ==================================
# STAGE 3: Runner
# ==================================
FROM node:18-alpine AS runner

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app

# Copiar dependencias de producción
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copiar archivos de prisma
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma

# Copiar build
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Copiar package.json para scripts
COPY --chown=nestjs:nodejs package*.json ./

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Cambiar a usuario no-root
USER nestjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usar dumb-init para manejo correcto de señales
ENTRYPOINT ["dumb-init", "--"]

# Comando de inicio
CMD ["node", "dist/main"]
