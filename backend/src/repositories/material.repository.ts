import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class MaterialRepository {
  async findByProjectId(projectId: string) {
    return prisma.material.findMany({
      where: { projectId, deletedAt: null },
      include: {
        payments: {
          orderBy: { date: 'desc' }
        }
      },
      orderBy: { purchasedDate: 'desc' }
    });
  }

  async findById(id: string) {
    return prisma.material.findFirst({
      where: { id, deletedAt: null }
    });
  }

  async create(data: Prisma.MaterialUncheckedCreateInput) {
    return prisma.material.create({
      data
    });
  }

  async softDelete(id: string) {
    return prisma.material.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async createPayment(data: Prisma.MaterialPaymentUncheckedCreateInput) {
    return prisma.materialPayment.create({
      data
    });
  }

  async deletePayment(id: string) {
    return prisma.materialPayment.delete({
      where: { id }
    });
  }
}

export const materialRepository = new MaterialRepository();
