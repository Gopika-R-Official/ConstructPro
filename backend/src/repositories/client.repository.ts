import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class ClientRepository {
  async findAll() {
    return prisma.client.findMany({
      where: { deletedAt: null },
      include: { _count: { select: { projects: { where: { deletedAt: null } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.client.findFirst({
      where: { id, deletedAt: null },
      include: { 
        projects: {
          where: { deletedAt: null },
          include: { payments: { where: { deletedAt: null } } }
        } 
      },
    });
  }

  async create(data: Prisma.ClientCreateInput) {
    return prisma.client.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ClientUpdateInput) {
    return prisma.client.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.client.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const clientRepository = new ClientRepository();
