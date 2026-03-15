import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Validador personalizado para RUT chileno
 * Verifica formato y dígito verificador
 */
@ValidatorConstraint({ name: 'isValidRut', async: false })
export class IsValidRutConstraint implements ValidatorConstraintInterface {
  validate(rut: string): boolean {
    if (!rut || typeof rut !== 'string') {
      return false;
    }

    // Limpiar RUT (remover puntos, guiones y espacios)
    const cleanRut = rut.replace(/[.\-\s]/g, '').toUpperCase();

    // Verificar formato mínimo (mínimo 8 caracteres: 1.111.111-1)
    if (cleanRut.length < 2) {
      return false;
    }

    // Separar número y dígito verificador
    const rutNumber = cleanRut.slice(0, -1);
    const verifierDigit = cleanRut.slice(-1);

    // Verificar que la parte numérica sea solo dígitos
    if (!/^\d+$/.test(rutNumber)) {
      return false;
    }

    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;

    // Recorrer de derecha a izquierda
    for (let i = rutNumber.length - 1; i >= 0; i--) {
      sum += parseInt(rutNumber[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedVerifier = 11 - (sum % 11);
    let calculatedVerifier: string;

    if (expectedVerifier === 11) {
      calculatedVerifier = '0';
    } else if (expectedVerifier === 10) {
      calculatedVerifier = 'K';
    } else {
      calculatedVerifier = expectedVerifier.toString();
    }

    // Comparar dígito verificador calculado con el proporcionado
    return calculatedVerifier === verifierDigit;
  }

  defaultMessage(): string {
    return 'El RUT ingresado no es válido';
  }
}

/**
 * Decorador para validar RUT chileno
 * @example
 * ```typescript
 * class SocioDto {
 *   @IsValidRut({ message: 'El RUT del socio no es válido' })
 *   rut: string;
 * }
 * ```
 */
export function IsValidRut(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidRutConstraint,
    });
  };
}

/**
 * Función auxiliar para formatear RUT
 * @param rut - RUT sin formato (ej: "123456789")
 * @returns RUT formateado (ej: "12.345.678-9")
 */
export function formatRut(rut: string): string {
  if (!rut) return '';

  const cleanRut = rut.replace(/[.\-\s]/g, '');
  const rutNumber = cleanRut.slice(0, -1);
  const verifierDigit = cleanRut.slice(-1);

  // Agregar puntos de miles
  const formattedNumber = rutNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedNumber}-${verifierDigit}`;
}

/**
 * Función auxiliar para limpiar RUT
 * @param rut - RUT con formato (ej: "12.345.678-9")
 * @returns RUT sin formato (ej: "123456789")
 */
export function cleanRut(rut: string): string {
  if (!rut) return '';
  return rut.replace(/[.\-\s]/g, '').toUpperCase();
}
