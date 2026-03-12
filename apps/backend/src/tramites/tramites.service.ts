import { Injectable } from '@nestjs/common';
import { CreateTramiteDto } from './dto/create-tramite.dto';

@Injectable()
export class TramitesService {
  private readonly data: Array<CreateTramiteDto & { id: string }> = [];

  findAll() {
    return this.data;
  }

  findOne(id: string) {
    return this.data.find((item) => item.id === id) ?? null;
  }

  create(dto: CreateTramiteDto) {
    const created = { id: crypto.randomUUID(), ...dto };
    this.data.push(created);
    return created;
  }
}
