import { PartialType } from '@nestjs/swagger';
import { CreateTipoBeneficioDto } from './create-tipo-beneficio.dto';

export class UpdateTipoBeneficioDto extends PartialType(
  CreateTipoBeneficioDto,
) {}
