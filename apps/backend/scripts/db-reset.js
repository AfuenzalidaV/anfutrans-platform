#!/usr/bin/env node
/**
 * Script de reset de base de datos
 * Elimina todos los datos, reaplica migraciones y ejecuta seed
 *
 * ⚠️ ADVERTENCIA: Este script elimina TODOS los datos
 *
 * Uso: npm run db:reset
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const env = process.env.NODE_ENV || 'development';

console.log('⚠️  ADVERTENCIA: Operación Destructiva ⚠️\n');
console.log('Este script eliminará TODOS los datos de la base de datos.');
console.log(`Entorno: ${env}\n`);

// Pedir confirmación solo si no está en modo automático
if (process.argv.includes('--force') || env === 'test') {
  executeReset();
} else {
  rl.question('¿Estás seguro que deseas continuar? (escribir "SI" para confirmar): ', (answer) => {
    rl.close();

    if (answer === 'SI') {
      executeReset();
    } else {
      console.log('\n❌ Operación cancelada');
      process.exit(0);
    }
  });
}

function executeReset() {
  console.log('\n🔄 Iniciando reset de base de datos...\n');

  try {
    // 1. Reset de migraciones (elimina datos y reaplica todo)
    console.log('🗑️  Reseteando migraciones...');
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
    console.log('✅ Reset completado\n');

    // 2. Generar cliente (por si acaso)
    console.log('📦 Generando cliente Prisma...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Cliente generado\n');

    console.log('✅ Base de datos reseteada exitosamente!');
    console.log('\n🔐 Credenciales de acceso:');
    console.log('   Email: admin@anfutrans.cl');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error durante el reset:', error.message);
    process.exit(1);
  }
}
