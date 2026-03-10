import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'

@Injectable()
export class UsuariosService {

  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.region.findMany()
  }

}
