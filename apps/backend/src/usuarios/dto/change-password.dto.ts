import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Contraseña actual del usuario',
    example: 'oldPassword123',
  })
  @IsString({ message: 'La contraseña actual debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña actual es requerida' })
  currentPassword!: string;

  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    example: 'newPassword456',
    minLength: 8,
  })
  @IsString({ message: 'La nueva contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La nueva contraseña es requerida' })
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres',
  })
  newPassword!: string;
}
