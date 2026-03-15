import { PartialType } from '@nestjs/swagger';
import { CreateCargoDirigencialDto } from './create-cargo-dirigencial.dto';

export class UpdateCargoDirigencialDto extends PartialType(
  CreateCargoDirigencialDto,
) {}
