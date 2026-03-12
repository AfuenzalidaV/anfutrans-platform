import { Injectable } from '@nestjs/common';
import { CreateSocioDto } from './dto/create-socio.dto';

@Injectable()
export class SociosService {
  private readonly data: Array<CreateSocioDto & { id: string }> = [];

  findAll() {
    return this.data;
  }

  findOne(id: string) {
    return this.data.find((item) => item.id === id) ?? null;
  }

  create(dto: CreateSocioDto) {
    const created = { id: crypto.randomUUID(), ...dto };
    this.data.push(created);
    return created;
  }
}
