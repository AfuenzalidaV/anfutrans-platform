#!/usr/bin/env node
/**
 * Script de verificación del estado de migraciones
 * Muestra información sobre migraciones pendientes
 *
 * Uso: npm run db:status
 */

const { execSync } = require('child_process');

console.log('🔍 Verificando estado de migraciones...\n');

try {
  execSync('npx prisma migrate status', { stdio: 'inherit' });

  console.log('\n✅ Verificación completada');
  process.exit(0);
} catch (error) {
  console.error('\n⚠️  Hay migraciones pendientes o problemas');
  console.error('Ejecuta "npm run db:setup" para aplicar migraciones');
  process.exit(1);
}
