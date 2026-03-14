import {
  PrismaClient,
  RolUsuario,
  EstadoSocio,
  EstadoSolicitud,
  TipoSolicitud,
  TipoDocumento,
} from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed de base de datos (v1.0 - Enums)...');

  // 1. Crear usuarios de prueba con enums
  console.log('👤 Creando usuarios con roles enum...');

  const passwordHash = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.usuario.upsert({
    where: { email: 'admin@anfutrans.cl' },
    update: {},
    create: {
      email: 'admin@anfutrans.cl',
      passwordHash,
      nombre: 'Admin',
      apellido: 'Sistema',
      rol: RolUsuario.ADMIN,
      activo: true,
    },
  });

  const directorNacionalUser = await prisma.usuario.upsert({
    where: { email: 'director.nacional@anfutrans.cl' },
    update: {},
    create: {
      email: 'director.nacional@anfutrans.cl',
      passwordHash,
      nombre: 'Juan',
      apellido: 'Pérez González',
      rol: RolUsuario.DIRECTOR_NACIONAL,
      activo: true,
    },
  });

  const directorRegionalUser = await prisma.usuario.upsert({
    where: { email: 'director.regional@anfutrans.cl' },
    update: {},
    create: {
      email: 'director.regional@anfutrans.cl',
      passwordHash,
      nombre: 'María',
      apellido: 'Rodríguez Silva',
      rol: RolUsuario.DIRECTOR_REGIONAL,
      activo: true,
    },
  });

  const funcionarioUser = await prisma.usuario.upsert({
    where: { email: 'funcionario@anfutrans.cl' },
    update: {},
    create: {
      email: 'funcionario@anfutrans.cl',
      passwordHash,
      nombre: 'Carlos',
      apellido: 'Muñoz Herrera',
      rol: RolUsuario.FUNCIONARIO,
      activo: true,
    },
  });

  const socioUser = await prisma.usuario.upsert({
    where: { email: 'socio@anfutrans.cl' },
    update: {},
    create: {
      email: 'socio@anfutrans.cl',
      passwordHash,
      nombre: 'Pedro',
      apellido: 'Torres Morales',
      rol: RolUsuario.SOCIO,
      activo: true,
    },
  });

  console.log(`✅ Usuarios creados:`);
  console.log(`   - admin@anfutrans.cl (ADMIN)`);
  console.log(`   - director.nacional@anfutrans.cl (DIRECTOR_NACIONAL)`);
  console.log(`   - director.regional@anfutrans.cl (DIRECTOR_REGIONAL)`);
  console.log(`   - funcionario@anfutrans.cl (FUNCIONARIO)`);
  console.log(`   - socio@anfutrans.cl (SOCIO)`);
  console.log(`   Password para todos: admin123\n`);

  // 2. Crear regiones (Chile)
  console.log('🗺️  Creando regiones...');

  const regiones = [
    { codigo: 'XV', nombre: 'Arica y Parinacota' },
    { codigo: 'I', nombre: 'Tarapacá' },
    { codigo: 'II', nombre: 'Antofagasta' },
    { codigo: 'III', nombre: 'Atacama' },
    { codigo: 'IV', nombre: 'Coquimbo' },
    { codigo: 'V', nombre: 'Valparaíso' },
    { codigo: 'RM', nombre: 'Región Metropolitana' },
    { codigo: 'VI', nombre: "O'Higgins" },
    { codigo: 'VII', nombre: 'Maule' },
    { codigo: 'XVI', nombre: 'Ñuble' },
    { codigo: 'VIII', nombre: 'Biobío' },
    { codigo: 'IX', nombre: 'La Araucanía' },
    { codigo: 'XIV', nombre: 'Los Ríos' },
    { codigo: 'X', nombre: 'Los Lagos' },
    { codigo: 'XI', nombre: 'Aysén' },
    { codigo: 'XII', nombre: 'Magallanes' },
  ];

  for (const region of regiones) {
    await prisma.region.upsert({
      where: { codigo: region.codigo },
      update: {},
      create: {
        codigo: region.codigo,
        nombre: region.nombre,
        activo: true,
      },
    });
  }

  console.log(`✅ Regiones creadas: ${regiones.length}`);

  // 3. Crear comunas de ejemplo (RM)
  console.log('🏙️  Creando comunas de ejemplo (RM)...');

  const regionRM = await prisma.region.findUnique({
    where: { codigo: 'RM' },
  });

  if (regionRM) {
    const comunasRM = [
      { codigo: 'RM-SAN', nombre: 'Santiago' },
      { codigo: 'RM-PRO', nombre: 'Providencia' },
      { codigo: 'RM-LCO', nombre: 'Las Condes' },
      { codigo: 'RM-VIT', nombre: 'Vitacura' },
      { codigo: 'RM-NUN', nombre: 'Ñuñoa' },
      { codigo: 'RM-LRE', nombre: 'La Reina' },
      { codigo: 'RM-MAC', nombre: 'Macul' },
      { codigo: 'RM-PEN', nombre: 'Peñalolén' },
      { codigo: 'RM-LFL', nombre: 'La Florida' },
      { codigo: 'RM-SJO', nombre: 'San Joaquín' },
      { codigo: 'RM-MAI', nombre: 'Maipú' },
      { codigo: 'RM-PUD', nombre: 'Pudahuel' },
      { codigo: 'RM-CER', nombre: 'Cerrillos' },
      { codigo: 'RM-ECE', nombre: 'Estación Central' },
      { codigo: 'RM-QNO', nombre: 'Quinta Normal' },
      { codigo: 'RM-LPR', nombre: 'Lo Prado' },
      { codigo: 'RM-REN', nombre: 'Renca' },
      { codigo: 'RM-QUI', nombre: 'Quilicura' },
      { codigo: 'RM-HUE', nombre: 'Huechuraba' },
      { codigo: 'RM-CON', nombre: 'Conchalí' },
      { codigo: 'RM-REC', nombre: 'Recoleta' },
      { codigo: 'RM-IND', nombre: 'Independencia' },
      { codigo: 'RM-SMI', nombre: 'San Miguel' },
      { codigo: 'RM-LCI', nombre: 'La Cisterna' },
      { codigo: 'RM-EBO', nombre: 'El Bosque' },
      { codigo: 'RM-LES', nombre: 'Lo Espejo' },
      { codigo: 'RM-PAC', nombre: 'Pedro Aguirre Cerda' },
      { codigo: 'RM-SRA', nombre: 'San Ramón' },
      { codigo: 'RM-LGR', nombre: 'La Granja' },
      { codigo: 'RM-LPI', nombre: 'La Pintana' },
      { codigo: 'RM-PAL', nombre: 'Puente Alto' },
      { codigo: 'RM-SBE', nombre: 'San Bernardo' },
    ];

    for (const comunaData of comunasRM) {
      await prisma.comuna.upsert({
        where: { codigo: comunaData.codigo },
        update: {},
        create: {
          codigo: comunaData.codigo,
          nombre: comunaData.nombre,
          regionId: regionRM.id,
          activo: true,
        },
      });
    }

    console.log(`✅ Comunas creadas: ${comunasRM.length}`);
  }

  // 4. Crear socios de ejemplo
  console.log('👥 Creando socios de ejemplo...');

  const comunaSantiago = await prisma.comuna.findFirst({
    where: { codigo: 'RM-SAN' },
  });

  const comunaMaipu = await prisma.comuna.findFirst({
    where: { codigo: 'RM-MAI' },
  });

  if (comunaSantiago && comunaMaipu) {
    const sociosData = [
      {
        rut: '12345678-9',
        nombre: 'Juan',
        apellido: 'Pérez González',
        email: 'juan.perez@example.com',
        telefono: '+56912345678',
        direccion: "Av. Libertador Bernardo O'Higgins 1234",
        comunaId: comunaSantiago.id,
        estado: EstadoSocio.ACTIVO,
        fechaIngreso: new Date('2020-03-15'),
      },
      {
        rut: '98765432-1',
        nombre: 'María',
        apellido: 'González Silva',
        email: 'maria.gonzalez@example.com',
        telefono: '+56998765432',
        direccion: 'Calle Estado 456',
        comunaId: comunaSantiago.id,
        estado: EstadoSocio.ACTIVO,
        fechaIngreso: new Date('2021-06-20'),
      },
      {
        rut: '11223344-5',
        nombre: 'Pedro',
        apellido: 'López Torres',
        email: 'pedro.lopez@example.com',
        telefono: '+56911223344',
        direccion: 'Pasaje Los Aromos 789',
        comunaId: comunaMaipu.id,
        estado: EstadoSocio.ACTIVO,
        fechaIngreso: new Date('2019-11-10'),
      },
      {
        rut: '55667788-9',
        nombre: 'Ana',
        apellido: 'Martínez Rojas',
        email: 'ana.martinez@example.com',
        telefono: '+56955667788',
        direccion: 'Av. Pajaritos 1020',
        comunaId: comunaMaipu.id,
        estado: EstadoSocio.ACTIVO,
        fechaIngreso: new Date('2022-01-05'),
      },
      {
        rut: '22334455-6',
        nombre: 'Carlos',
        apellido: 'Fernández Díaz',
        email: 'carlos.fernandez@example.com',
        telefono: '+56922334455',
        direccion: 'Calle San Pablo 2030',
        comunaId: comunaSantiago.id,
        estado: EstadoSocio.SUSPENDIDO,
        fechaIngreso: new Date('2018-07-22'),
      },
    ];

    for (const socioData of sociosData) {
      await prisma.socio.upsert({
        where: { rut: socioData.rut },
        update: {},
        create: socioData,
      });
    }

    console.log(`✅ Socios creados: ${sociosData.length}`);
  }

  // 5. Crear solicitudes de ejemplo con enums
  console.log('📋 Creando solicitudes de ejemplo...');

  const socio1 = await prisma.socio.findUnique({
    where: { rut: '12345678-9' },
  });

  const socio2 = await prisma.socio.findUnique({
    where: { rut: '98765432-1' },
  });

  const socio3 = await prisma.socio.findUnique({
    where: { rut: '11223344-5' },
  });

  if (socio1 && socio2 && socio3) {
    const solicitudesData = [
      {
        socioId: socio1.id,
        tipo: TipoSolicitud.CERTIFICADO_AFILIACION,
        estado: EstadoSolicitud.APROBADA,
        observaciones: 'Certificado de afiliación para trámite laboral',
      },
      {
        socioId: socio1.id,
        tipo: TipoSolicitud.PRESTAMO,
        estado: EstadoSolicitud.EN_REVISION,
        observaciones: 'Préstamo por emergencia médica - $500.000',
      },
      {
        socioId: socio2.id,
        tipo: TipoSolicitud.BENEFICIO_SALUD,
        estado: EstadoSolicitud.APROBADA,
        observaciones: 'Beneficio dental para familia',
      },
      {
        socioId: socio2.id,
        tipo: TipoSolicitud.CERTIFICADO_ANTIGUEDAD,
        estado: EstadoSolicitud.PENDIENTE,
        observaciones: 'Certificado de antigüedad',
      },
      {
        socioId: socio3.id,
        tipo: TipoSolicitud.PRESTAMO,
        estado: EstadoSolicitud.BORRADOR,
        observaciones: 'Préstamo para reparación vehículo - borrador',
      },
      {
        socioId: socio3.id,
        tipo: TipoSolicitud.AYUDA_SOCIAL,
        estado: EstadoSolicitud.PENDIENTE,
        observaciones: 'Ayuda social por situación familiar',
      },
    ];

    for (const solicitudData of solicitudesData) {
      await prisma.solicitud.create({
        data: solicitudData,
      });
    }

    console.log(`✅ Solicitudes creadas: ${solicitudesData.length}`);
  }

  // 6. Crear documentos de ejemplo
  console.log('📎 Creando documentos de ejemplo...');

  const documentosData = [
    {
      nombreArchivo: 'reglamento-interno-2024.pdf',
      titulo: 'Reglamento Interno ANFUTRANS',
      descripcion: 'Reglamento interno del sindicato actualizado 2024',
      ruta: '/documentos/reglamento-interno-2024.pdf',
      tipo: TipoDocumento.REGLAMENTO,
      usuarioId: adminUser.id,
      publico: true,
    },
    {
      nombreArchivo: 'acta-asamblea-2024.pdf',
      titulo: 'Acta Asamblea General 2024',
      descripcion: 'Acta de asamblea general extraordinaria',
      ruta: '/documentos/acta-asamblea-2024.pdf',
      tipo: TipoDocumento.ACTA,
      usuarioId: adminUser.id,
      publico: true,
    },
    {
      nombreArchivo: 'formulario-prestamo.pdf',
      titulo: 'Formulario Solicitud de Préstamo',
      descripcion: 'Formulario para solicitar préstamo',
      ruta: '/documentos/formulario-prestamo.pdf',
      tipo: TipoDocumento.FORMULARIO,
      usuarioId: funcionarioUser.id,
      publico: true,
    },
  ];

  for (const documentoData of documentosData) {
    await prisma.documento.create({
      data: documentoData,
    });
  }

  console.log(`✅ Documentos creados: ${documentosData.length}\n`);

  // Resumen final
  console.log('═══════════════════════════════════════════════════════');
  console.log('✅ SEED COMPLETADO - BASE DE DATOS v1.0 (ENUMS)');
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 Resumen:');
  console.log(
    `   - Usuarios: 5 (ADMIN, DIRECTOR_NACIONAL, DIRECTOR_REGIONAL, FUNCIONARIO, SOCIO)`,
  );
  console.log(`   - Regiones: 16 completas de Chile`);
  console.log(`   - Comunas: 32 de la Región Metropolitana`);
  console.log(`   - Socios: 5 con diferentes estados`);
  console.log(`   - Solicitudes: 6 con diferentes tipos y estados`);
  console.log(`   - Documentos: 3 institucionales\n`);
  console.log('🔑 Credenciales de prueba (todas con password: admin123):');
  console.log(`   - admin@anfutrans.cl`);
  console.log(`   - director.nacional@anfutrans.cl`);
  console.log(`   - director.regional@anfutrans.cl`);
  console.log(`   - funcionario@anfutrans.cl`);
  console.log(`   - socio@anfutrans.cl`);
  console.log('═══════════════════════════════════════════════════════');
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
