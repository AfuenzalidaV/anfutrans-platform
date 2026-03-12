import { Injectable } from '@nestjs/common';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';

@Injectable()
export class BeneficiosService {
  private readonly data: Array<CreateBeneficioDto & { id: string }> = [];

  findAll() {
    return this.data;
  }

  findOne(id: string) {
    return this.data.find((item) => item.id === id) ?? null;
  }

  create(dto: CreateBeneficioDto) {
    const created = { id: crypto.randomUUID(), ...dto };
    this.data.push(created);
    return created;
  }
}
