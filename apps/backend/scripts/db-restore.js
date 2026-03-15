#!/usr/bin/env node
/**
 * Script de restauración de base de datos desde backup
 *
 * Uso: node scripts/db-restore.js <archivo-backup.sql>
 *
 * Requiere: psql instalado (viene con PostgreSQL)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Parsear argumentos
const backupFile = process.argv[2];

if (!backupFile) {
  console.error('❌ Uso: node scripts/db-restore.js <archivo-backup.sql>');
  process.exit(1);
}

if (!fs.existsSync(backupFile)) {
  console.error(`❌ Archivo no encontrado: ${backupFile}`);
  process.exit(1);
}

// Parsear DATABASE_URL
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('❌ DATABASE_URL no está configurada en .env');
  process.exit(1);
}

const urlMatch = databaseUrl.match(
  /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/,
);
if (!urlMatch) {
  console.error('❌ Formato de DATABASE_URL inválido');
  process.exit(1);
}

const [, user, password, host, port, database] = urlMatch;

console.log('⚠️  ADVERTENCIA: Operación Destructiva ⚠️\n');
console.log('Este script SOBRESCRIBIRÁ todos los datos actuales.');
console.log(`Base de datos: ${database}`);
console.log(`Backup: ${path.basename(backupFile)}\n`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  '¿Estás seguro que deseas continuar? (escribir "SI" para confirmar): ',
  (answer) => {
    rl.close();

    if (answer !== 'SI') {
      console.log('\n❌ Operación cancelada');
      process.exit(0);
    }

    console.log('\n🔄 Restaurando base de datos...');

    try {
      // Configurar variable de entorno para password
      process.env.PGPASSWORD = password;

      // Ejecutar psql para restaurar
      const command = `psql -h ${host} -p ${port} -U ${user} -d ${database} -f "${backupFile}"`;
      execSync(command, { stdio: 'inherit' });

      console.log('\n✅ Base de datos restaurada exitosamente!');
      process.exit(0);
    } catch (error) {
      console.error('\n❌ Error al restaurar backup:', error.message);
      console.error(
        '\nAsegúrate de que psql esté instalado y accesible en PATH',
      );
      process.exit(1);
    } finally {
      delete process.env.PGPASSWORD;
    }
  },
);
