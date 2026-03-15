#!/usr/bin/env node
/**
 * Script de backup de base de datos PostgreSQL
 * Crea un dump de la base de datos
 *
 * Uso: node scripts/db-backup.js
 *
 * Requiere: pg_dump instalado (viene con PostgreSQL)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parsear DATABASE_URL
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('❌ DATABASE_URL no está configurada en .env');
  process.exit(1);
}

// Extraer información de la URL
const urlMatch = databaseUrl.match(
  /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/,
);
if (!urlMatch) {
  console.error('❌ Formato de DATABASE_URL inválido');
  process.exit(1);
}

const [, user, password, host, port, database] = urlMatch;

// Crear directorio de backups si no existe
const backupDir = path.join(__dirname, '../backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Nombre del archivo de backup con timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('.')[0];
const backupFile = path.join(backupDir, `backup_${database}_${timestamp}.sql`);

console.log('💾 Creando backup de base de datos...');
console.log(`   Base de datos: ${database}`);
console.log(`   Host: ${host}:${port}`);
console.log(`   Archivo: ${backupFile}\n`);

try {
  // Configurar variable de entorno para password
  process.env.PGPASSWORD = password;

  // Ejecutar pg_dump
  const command = `pg_dump -h ${host} -p ${port} -U ${user} -d ${database} -F p -f "${backupFile}"`;
  execSync(command, { stdio: 'inherit' });

  // Obtener tamaño del archivo
  const stats = fs.statSync(backupFile);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log('\n✅ Backup creado exitosamente!');
  console.log(`   Tamaño: ${fileSizeMB} MB`);
  console.log(`   Ubicación: ${backupFile}`);

  // Limpiar backups antiguos (opcional, mantener últimos 7)
  cleanOldBackups(backupDir, 7);

  process.exit(0);
} catch (error) {
  console.error('\n❌ Error al crear backup:', error.message);
  console.error(
    '\nAsegúrate de que pg_dump esté instalado y accesible en PATH',
  );
  process.exit(1);
} finally {
  delete process.env.PGPASSWORD;
}

function cleanOldBackups(dir, keepCount) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith('backup_') && f.endsWith('.sql'))
    .map((f) => ({
      name: f,
      path: path.join(dir, f),
      time: fs.statSync(path.join(dir, f)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time);

  if (files.length > keepCount) {
    console.log(
      `\n🗑️  Limpiando backups antiguos (manteniendo ${keepCount})...`,
    );
    files.slice(keepCount).forEach((file) => {
      fs.unlinkSync(file.path);
      console.log(`   Eliminado: ${file.name}`);
    });
  }
}
