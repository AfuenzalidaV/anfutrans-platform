import { PartialType } from '@nestjs/swagger';
import { CreateBeneficioDto } from './create-beneficio.dto';

export class UpdateBeneficioDto extends PartialType(CreateBeneficioDto) {}
