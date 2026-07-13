import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class SubcontractorRepository {
  async findByProjectId(projectId: string) {
    return prisma.subcontractor.findMany({
      where: { projectId, deletedAt: null },
      include: {
        payments: { orderBy: { date: 'desc' } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string) {
    return prisma.subcontractor.findFirst({
      where: { id, deletedAt: null },
      include: {
        payments: { orderBy: { date: 'desc' } }
      }
    });
  }

  async create(data: Prisma.SubcontractorUncheckedCreateInput) {
    return prisma.subcontractor.create({ data });
  }

  async softDelete(id: string) {
    return prisma.subcontractor.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async createPayment(data: Prisma.SubcontractorPaymentUncheckedCreateInput) {
    return prisma.subcontractorPayment.create({ data });
  }

  async deletePayment(id: string) {
    return prisma.subcontractorPayment.delete({ where: { id } });
  }
}

export const subcontractorRepository = new SubcontractorRepository();
