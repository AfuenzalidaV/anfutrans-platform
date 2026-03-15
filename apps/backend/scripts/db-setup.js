#!/usr/bin/env node
/**
 * Script de inicialización de base de datos
 * Ejecuta migraciones y seed
 *
 * Uso: npm run db:setup
 */

const { execSync } = require('child_process');

console.log('🚀 Iniciando configuración de base de datos...\n');

try {
  // 1. Generar Cliente Prisma
  console.log('📦 Generando cliente Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Cliente Prisma generado\n');

  // 2. Aplicar migraciones
  console.log('🔄 Aplicando migraciones...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('✅ Migraciones aplicadas\n');

  // 3. Ejecutar seed
  console.log('🌱 Ejecutando seed...');
  execSync('ts-node prisma/seed.ts', { stdio: 'inherit' });
  console.log('✅ Seed completado\n');

  console.log('✅ Base de datos configurada exitosamente!');
  console.log('\n🔐 Credenciales de acceso:');
  console.log('   Email: admin@anfutrans.cl');
  console.log('   Password: admin123\n');

  process.exit(0);
} catch (error) {
  console.error('\n❌ Error durante la configuración:', error.message);
  process.exit(1);
}
