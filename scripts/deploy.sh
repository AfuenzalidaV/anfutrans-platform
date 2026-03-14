#!/bin/bash
# ================================
# Script de Deploy para ANFUTRANS
# ================================

set -e  # Exit on error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración
ENVIRONMENT=${1:-staging}
PROJECT_DIR="/opt/anfutrans"
BACKUP_DIR="$PROJECT_DIR/backups"
COMPOSE_FILE="docker-compose.yml"

# Funciones
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

check_environment() {
    if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
        print_error "Environment must be 'staging' or 'production'"
    fi
    print_info "Deploying to: $ENVIRONMENT"
}

check_requirements() {
    print_info "Checking requirements..."

    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
    fi

    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
    fi

    if [ ! -f "$PROJECT_DIR/.env" ]; then
        print_error ".env file not found in $PROJECT_DIR"
    fi

    print_info "Requirements OK"
}

create_backup() {
    print_info "Creating database backup..."

    mkdir -p "$BACKUP_DIR"

    BACKUP_FILE="$BACKUP_DIR/backup_${ENVIRONMENT}_$(date +%Y%m%d_%H%M%S).sql"

    docker-compose exec -T db pg_dump -U anfutrans_user anfutrans_db > "$BACKUP_FILE" || {
        print_warning "Backup failed, continuing anyway..."
    }

    print_info "Backup saved to: $BACKUP_FILE"

    # Mantener solo los últimos 7 backups
    find "$BACKUP_DIR" -name "backup_${ENVIRONMENT}_*.sql" -type f -mtime +7 -delete
}

pull_images() {
    print_info "Pulling latest Docker images..."
    docker-compose pull
}

stop_services() {
    print_info "Stopping services..."
    docker-compose down
}

start_services() {
    print_info "Starting services..."
    docker-compose up -d
}

run_migrations() {
    print_info "Running database migrations..."

    # Esperar a que el backend esté listo
    sleep 10

    docker-compose exec -T backend npx prisma migrate deploy || {
        print_error "Migration failed!"
    }

    print_info "Migrations completed"
}

health_check() {
    print_info "Running health checks..."

    local max_attempts=30
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        if curl -f http://localhost:3000/health &> /dev/null; then
            print_info "Backend health check passed"
            return 0
        fi

        print_warning "Health check attempt $attempt/$max_attempts failed, retrying..."
        sleep 2
        attempt=$((attempt + 1))
    done

    print_error "Health check failed after $max_attempts attempts"
}

cleanup_old_images() {
    print_info "Cleaning up old Docker images..."
    docker image prune -f
}

show_status() {
    print_info "Service status:"
    docker-compose ps
}

rollback() {
    print_error "Deployment failed! Rolling back..."

    # Detener servicios
    docker-compose down

    # Restaurar último backup
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/backup_${ENVIRONMENT}_*.sql 2>/dev/null | head -n1)

    if [ -n "$LATEST_BACKUP" ]; then
        print_info "Restoring backup: $LATEST_BACKUP"
        docker-compose up -d db
        sleep 5
        cat "$LATEST_BACKUP" | docker-compose exec -T db psql -U anfutrans_user -d anfutrans_db
    fi

    # Volver a versión anterior
    docker-compose up -d

    exit 1
}

# Trap errors para rollback automático
trap rollback ERR

# ================================
# MAIN
# ================================

print_info "==================================="
print_info "ANFUTRANS Deployment Script"
print_info "==================================="

# Cambiar al directorio del proyecto
cd "$PROJECT_DIR" || print_error "Project directory not found: $PROJECT_DIR"

# Ejecutar pasos
check_environment
check_requirements

# Confirmación para producción
if [ "$ENVIRONMENT" = "production" ]; then
    read -p "Are you sure you want to deploy to PRODUCTION? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        print_info "Deployment cancelled"
        exit 0
    fi
fi

create_backup
pull_images
stop_services
start_services
run_migrations
health_check
cleanup_old_images
show_status

print_info "==================================="
print_info "Deployment completed successfully!"
print_info "==================================="

# Mostrar logs recientes
print_info "Recent logs:"
docker-compose logs --tail=50
