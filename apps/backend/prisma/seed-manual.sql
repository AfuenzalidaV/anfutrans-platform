-- ================================================================================
-- SEED MANUAL PARA ANFUTRANS
-- Ejecutar: psql -U anfutrans_app -d anfutrans_db -f seed-manual.sql
-- ================================================================================

SET search_path TO core;

-- 1. ROLES
INSERT INTO rol (codigo, nombre, descripcion, activo) VALUES
('ADMIN', 'Administrador', 'Acceso total al sistema', true),
('DIRECTOR_NACIONAL', 'Director Nacional', 'Director nacional de ANFUTRANS - Aprobaciones finales y gestión estratégica', true),
('DIRECTOR_REGIONAL', 'Director Regional', 'Director regional - Revisión y derivación de solicitudes', true),
('FUNCIONARIO', 'Funcionario', 'Funcionario administrativo - Gestión operativa', true),
('SOCIO', 'Socio', 'Socio de ANFUTRANS - Acceso a solicitudes y consultas personales', true)
ON CONFLICT (codigo) DO NOTHING;

-- 2. USUARIOS DE PRUEBA (password: admin123)
-- Hash bcrypt de "admin123":  $2b$10$YourHashHere (generar con: node -e "console.log(require('bcrypt').hashSync('admin123', 10))")
-- Usando hash: $2b$10$rOj7fF4KqN8h3xH4Y.4YLOZqK5YgR3VBG/xN7FoZLJ0k8nPv9QKXm

INSERT INTO usuario (email, "passwordHash",nombre, apellido, "rolId", activo)
SELECT
  'admin@anfutrans.cl',
  '$2b$10$rOj7fF4KqN8h3xH4Y.4YLOZqK5YgR3VBG/xN7FoZLJ0k8nPv9QKXm',
  'Admin',
  'Sistema',
  (SELECT id FROM rol WHERE codigo = 'ADMIN'),
  true
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email = 'admin@anfutrans.cl');

INSERT INTO usuario (email, "passwordHash", nombre, apellido, "rolId", activo)
SELECT
  'director.nacional@anfutrans.cl',
  '$2b$10$rOj7fF4KqN8h3xH4Y.4YLOZqK5YgR3VBG/xN7FoZLJ0k8nPv9QKXm',
  'Juan',
  'Pérez González',
  (SELECT id FROM rol WHERE codigo = 'DIRECTOR_NACIONAL'),
  true
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email = 'director.nacional@anfutrans.cl');

INSERT INTO usuario (email, "passwordHash", nombre, apellido, "rolId", activo)
SELECT
  'director.regional@anfutrans.cl',
  '$2b$10$rOj7fF4KqN8h3xH4Y.4YLOZqK5YgR3VBG/xN7FoZLJ0k8nPv9QKXm',
  'María',
  'Rodríguez Silva',
  (SELECT id FROM rol WHERE codigo = 'DIRECTOR_REGIONAL'),
  true
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email = 'director.regional@anfutrans.cl');

INSERT INTO usuario (email, "passwordHash", nombre, apellido, "rolId", activo)
SELECT
  'funcionario@anfutrans.cl',
  '$2b$10$rOj7fF4KqN8h3xH4Y.4YLOZqK5YgR3VBG/xN7FoZLJ0k8nPv9QKXm',
  'Carlos',
  'Muñoz Herrera',
  (SELECT id FROM rol WHERE codigo = 'FUNCIONARIO'),
  true
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email = 'funcionario@anfutrans.cl');

INSERT INTO usuario (email, "passwordHash", nombre, apellido, "rolId", activo)
SELECT
  'socio@anfutrans.cl',
  '$2b$10$rOj7fF4KqN8h3xH4Y.4YLOZqK5YgR3VBG/xN7FoZLJ0k8nPv9QKXm',
  'Pedro',
  'Torres Morales',
  (SELECT id FROM rol WHERE codigo = 'SOCIO'),
  true
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email = 'socio@anfutrans.cl');

-- 3. ESTADOS DE SOLICITUD
INSERT INTO estado_solicitud (codigo, nombre, orden, activo) VALUES
('BORRADOR', 'Borrador', 1, true),
('PENDIENTE', 'Pendiente', 2, true),
('EN_REVISION', 'En Revisión', 3, true),
('APROBADA', 'Aprobada', 4, true),
('RECHAZADA', 'Rechazada', 5, true),
('COMPLETADA', 'Completada', 6, true),
('CANCELADA', 'Cancelada', 7, true)
ON CONFLICT (codigo) DO NOTHING;

-- 4. TIPOS DE SOLICITUD
INSERT INTO tipo_solicitud (codigo, nombre, descripcion, "requiereAprobacion", "permiteBorrador") VALUES
('CERTIFICADO_AFILIACION', 'Certificado de Afiliación', 'Solicitud de certificado de afiliación sindical', false, true),
('PRESTAMO_SOLIDARIO', 'Préstamo Solidario', 'Solicitud de préstamo solidario para socio', true, true),
('BENEFICIO_SALUD', 'Beneficio de Salud', 'Solicitud de beneficio relacionado con salud', true, true),
('CERTIFICADO_ANTIGUEDAD', 'Certificado de Antigüedad', 'Certificado de antigüedad como socio', false, true)
ON CONFLICT (codigo) DO NOTHING;

-- 5. TIPOS DE BENEFICIO
INSERT INTO tipo_beneficio (codigo, nombre, activo) VALUES
('SALUD', 'Salud', true),
('EDUCACION', 'Educación', true),
('RECREACION', 'Recreación', true),
('ASISTENCIA', 'Asistencia Social', true)
ON CONFLICT (codigo) DO NOTHING;

-- 6. TIPOS DE DOCUMENTO
INSERT INTO tipo_documento (codigo, nombre, ambito) VALUES
('RUT', 'RUT o Cédula de Identidad', 'IDENTIFICACION'),
('LICENCIA_MEDICA', 'Licencia Médica', 'SALUD'),
('CERTIFICADO_ESTUDIO', 'Certificado de Estudios', 'EDUCACION'),
('COMPROBANTE_DOMICILIO', 'Comprobante de Domicilio', 'GENERAL'),
('OTRO', 'Otro Documento', 'GENERAL')
ON CONFLICT (codigo) DO NOTHING;

-- 7. REGIONES
INSERT INTO region (codigo, nombre, activo) VALUES
('RM', 'Región Metropolitana', true),
('V', 'Valparaíso', true),
('VIII', 'Biobío', true),
('X', 'Los Lagos', true)
ON CONFLICT (codigo) DO NOTHING;

-- 8. COM UNAS (solo algunas de ejemplo)
INSERT INTO comuna (nombre, "regionId", activo)
SELECT 'Santiago', id, true FROM region WHERE codigo = 'RM'
ON CONFLICT DO NOTHING;

INSERT INTO comuna (nombre, "regionId", activo)
SELECT 'Maipú', id, true FROM region WHERE codigo = 'RM'
ON CONFLICT DO NOTHING;

INSERT INTO comuna (nombre, "regionId", activo)
SELECT 'Puente Alto', id, true FROM region WHERE codigo = 'RM'
ON CONFLICT DO NOTHING;

INSERT INTO comuna (nombre, "regionId", activo)
SELECT 'Valparaíso', id, true FROM region WHERE codigo = 'V'
ON CONFLICT DO NOTHING;

INSERT INTO comuna (nombre, "regionId", activo)
SELECT 'Viña del Mar', id, true FROM region WHERE codigo = 'V'
ON CONFLICT DO NOTHING;

-- Verificación
SELECT 'ROLES creados:' AS resultado, COUNT(*) FROM rol;
SELECT 'USUARIOS creados:' AS resultado, COUNT(*) FROM usuario;
SELECT 'ESTADOS creados:' AS resultado, COUNT(*) FROM estado_solicitud;
SELECT 'TIPOS SOLICITUD creados:' AS resultado, COUNT(*) FROM tipo_solicitud;

\echo '✅ Seed manual completado exitosamente'
\echo ''
\echo 'Usuarios de prueba creados (password: admin123):'
\echo '  - admin@anfutrans.cl (ADMIN)'
\echo '  - director.nacional@anfutrans.cl (DIRECTOR_NACIONAL)'
\echo '  - director.regional@anfutrans.cl (DIRECTOR_REGIONAL)'
\echo '  - funcionario@anfutrans.cl (FUNCIONARIO)'
\echo '  - socio@anfutrans.cl (SOCIO)'
