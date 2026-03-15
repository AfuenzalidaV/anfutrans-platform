import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Aplicar pipes de validación global
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/login (POST)', () => {
    it('debería retornar 401 con credenciales inválidas', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid@test.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });

    it('debería retornar 400 si falta el email', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          password: 'password123',
        })
        .expect(400);
    });

    it('debería retornar 400 si falta el password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@test.com',
        })
        .expect(400);
    });

    it('debería retornar 400 con email inválido', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'not-an-email',
          password: 'password123',
        })
        .expect(400);
    });

    // Test de login exitoso (requiere usuario en BD de prueba)
    it.skip('debería retornar access_token con credenciales válidas', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@anfutrans.cl',
          password: 'admin123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('token_type', 'Bearer');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user).toHaveProperty('email', 'admin@anfutrans.cl');
        });
    });
  });

  describe('/auth/register (POST)', () => {
    it('debería retornar 400 si falta un campo requerido', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@test.com',
          // Faltan otros campos requeridos
        })
        .expect(400);
    });

    it('debería retornar 400 con email inválido', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'invalid-email',
          password: 'pass123',
          nombre: 'Test',
          apellido: 'User',
          rut: '12345678-9',
        })
        .expect(400);
    });

    it('debería retornar 400 si el password es muy corto', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@test.com',
          password: '123', // Muy corto
          nombre: 'Test',
          apellido: 'User',
          rut: '12345678-9',
        })
        .expect(400);
    });

    // Test de registro exitoso (dependiendo de configuración de BD)
    it.skip('debería registrar un nuevo usuario exitosamente', () => {
      const uniqueEmail = `test-${Date.now()}@anfutrans.cl`;

      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: uniqueEmail,
          password: 'password123',
          nombre: 'Usuario',
          apellido: 'Prueba',
          rut: '12345678-9',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('email', uniqueEmail);
          expect(res.body).not.toHaveProperty('passwordHash');
        });
    });

    it.skip('debería retornar 409 si el email ya está registrado', async () => {
      const existingEmail = 'duplicate@test.com';

      // Primer registro
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: existingEmail,
          password: 'password123',
          nombre: 'Test',
          apellido: 'User',
          rut: '12345678-9',
        })
        .expect(201);

      // Segundo registro con mismo email
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: existingEmail,
          password: 'password456',
          nombre: 'Test2',
          apellido: 'User2',
          rut: '98765432-1',
        })
        .expect(409);
    });
  });

  describe('Endpoints protegidos', () => {
    it('debería retornar 401 al acceder a endpoint protegido sin token', () => {
      return request(app.getHttpServer())
        .get('/api/usuarios')
        .expect(401);
    });

    it.skip('debería permitir acceso con token válido', async () => {
      // Primero hacer login para obtener token
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@anfutrans.cl',
          password: 'admin123',
        })
        .expect(201);

      const token = loginResponse.body.access_token;

      // Usar token en endpoint protegido
      return request(app.getHttpServer())
        .get('/api/usuarios')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('debería retornar 401 con token inválido', () => {
      return request(app.getHttpServer())
        .get('/api/usuarios')
        .set('Authorization', 'Bearer invalid-token-123')
        .expect(401);
    });
  });
});
