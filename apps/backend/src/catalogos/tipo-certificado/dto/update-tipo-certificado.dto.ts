import { PartialType } from '@nestjs/swagger';
import { CreateTipoCertificadoDto } from './create-tipo-certificado.dto';

export class UpdateTipoCertificadoDto extends PartialType(CreateTipoCertificadoDto) {}
