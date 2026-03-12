import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  private readonly data: Array<CreateUsuarioDto & { id: string }> = [];

  findAll() {
    return this.data;
  }

  findOne(id: string) {
    return this.data.find((item) => item.id === id) ?? null;
  }

  create(dto: CreateUsuarioDto) {
    const created = { id: crypto.randomUUID(), ...dto };
    this.data.push(created);
    return created;
  }
}
