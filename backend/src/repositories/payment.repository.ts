import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class PaymentRepository {
  async findByProjectId(projectId: string) {
    return prisma.payment.findMany({
      where: { projectId, deletedAt: null },
      orderBy: { date: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.payment.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async create(data: Prisma.PaymentUncheckedCreateInput) {
    return prisma.payment.create({
      data,
    });
  }

  async update(id: string, data: Prisma.PaymentUpdateInput) {
    return prisma.payment.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.payment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const paymentRepository = new PaymentRepository();
