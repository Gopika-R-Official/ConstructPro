import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class ProjectRepository {
  async findAll() {
    return prisma.project.findMany({
      where: { deletedAt: null },
      include: { client: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.project.findFirst({
      where: { id, deletedAt: null },
      include: {
        client: true,
        expenses: { orderBy: { date: 'desc' } },
        payments: { orderBy: { date: 'desc' } },
      },
    });
  }

  async create(data: Prisma.ProjectUncheckedCreateInput) {
    return prisma.project.create({
      data,
    });
  }
}

export const projectRepository = new ProjectRepository();
