import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSocioDto } from './dto/create-socio.dto';

@Injectable()
export class SociosService {
  private readonly data: Array<CreateSocioDto & { id: string }> = [];

  findAll() {
    return this.data;
  }

  findOne(id: string) {
    const item = this.data.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Socio con ID ${id} no encontrado`);
    }
    return item;
  }

  create(dto: CreateSocioDto) {
    const created = { id: crypto.randomUUID(), ...dto };
    this.data.push(created);
    return created;
  }

  update(id: string, dto: Partial<CreateSocioDto>) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Socio con ID ${id} no encontrado`);
    }
    this.data[index] = { ...this.data[index], ...dto };
    return this.data[index];
  }

  remove(id: string) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Socio con ID ${id} no encontrado`);
    }
    this.data.splice(index, 1);
    return { message: `Socio con ID ${id} eliminado exitosamente` };
  }
}
