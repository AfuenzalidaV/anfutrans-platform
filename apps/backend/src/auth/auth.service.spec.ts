import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PrismaService } from '../database/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockPrismaService = {
    usuario: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register()', () => {
    const registerDto = {
      email: 'test@anfutrans.cl',
      password: 'password123',
      nombre: 'Test',
      apellido: 'User',
      rut: '12345678-9',
    };

    it('debería registrar un nuevo usuario exitosamente', async () => {
      mockPrismaService.usuario.findUnique.mockResolvedValue(null);
      mockPrismaService.usuario.create.mockResolvedValue({
        id: 1,
        ...registerDto,
        password: 'hashed-password',
        activo: true,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(registerDto.email);
      expect(mockPrismaService.usuario.findUnique).toHaveBeenCalledWith({
        where: { email: registerDto.email },
      });
    });

    it('debería lanzar ConflictException si el email ya existe', async () => {
      mockPrismaService.usuario.findUnique.mockResolvedValue({
        id: 1,
        email: registerDto.email,
      });

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockPrismaService.usuario.create).not.toHaveBeenCalled();
    });

    it('debería hashear la contraseña antes de guardar', async () => {
      mockPrismaService.usuario.findUnique.mockResolvedValue(null);
      mockPrismaService.usuario.create.mockImplementation((data) => {
        return Promise.resolve({
          id: 1,
          ...data.data,
          created_at: new Date(),
          updated_at: new Date(),
        });
      });

      await service.register(registerDto);

      const createCall = mockPrismaService.usuario.create.mock.calls[0][0];
      expect(createCall.data.password).not.toBe(registerDto.password);
      expect(createCall.data.password).toBeDefined();
    });
  });

  describe('login()', () => {
    const loginDto = {
      email: 'admin@anfutrans.cl',
      password: 'admin123',
    };

    const mockUser = {
      id: 1,
      email: loginDto.email,
      passwordHash: '$2b$10$hashedpassword',
      nombre: 'Admin',
      apellido: 'User',
      activo: true,
      rolId: 1,
      rol: {
        id: 1,
        codigo: 'ADMIN',
        nombre: 'Administrador',
      },
    };

    it('debería retornar un access_token con credenciales válidas', async () => {
      mockPrismaService.usuario.findUnique.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
      mockJwtService.sign.mockReturnValue('jwt-token-123');

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('jwt-token-123');
      expect(result).toHaveProperty('token_type', 'Bearer');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe(mockUser.email);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        rolId: mockUser.rolId,
      });
    });

    it('debería lanzar UnauthorizedException si el usuario no existe', async () => {
      mockPrismaService.usuario.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('debería lanzar UnauthorizedException si la contraseña es incorrecta', async () => {
      mockPrismaService.usuario.findUnique.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('debería lanzar UnauthorizedException si el usuario está inactivo', async () => {
      const inactiveUser = { ...mockUser, activo: false };
      mockPrismaService.usuario.findUnique.mockResolvedValue(inactiveUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('debería buscar usuario por email', async () => {
      mockPrismaService.usuario.findUnique.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
      mockJwtService.sign.mockReturnValue('token');

      await service.login(loginDto);

      expect(mockPrismaService.usuario.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
    });
  });

  describe('validateUser()', () => {
    it('debería retornar un usuario válido', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        activo: true,
      };
      mockPrismaService.usuario.findUnique.mockResolvedValue(mockUser);

      const result = await service.validateUser(1);

      expect(result).toEqual(mockUser);
      expect(mockPrismaService.usuario.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('debería retornar null si el usuario no existe', async () => {
      mockPrismaService.usuario.findUnique.mockResolvedValue(null);

      const result = await service.validateUser(999);

      expect(result).toBeNull();
    });
  });
});
