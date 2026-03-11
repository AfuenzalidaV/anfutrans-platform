import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class RegionesService {

  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.region.findMany()
  }

};