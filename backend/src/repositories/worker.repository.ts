import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class WorkerRepository {
  async findByProjectId(projectId: string) {
    return prisma.worker.findMany({
      where: { projectId, deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.worker.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async create(data: Prisma.WorkerUncheckedCreateInput) {
    return prisma.worker.create({
      data,
    });
  }

  async update(id: string, data: Prisma.WorkerUpdateInput) {
    return prisma.worker.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.worker.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getLedgerData(projectId: string, startDate: Date, endDate: Date) {
    return prisma.worker.findMany({
      where: { projectId, deletedAt: null },
      include: {
        attendances: {
          where: { date: { gte: startDate, lte: endDate }, status: 'Present' },
        },
        payments: {
          where: { date: { gte: startDate, lte: endDate } },
          orderBy: { date: 'desc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async createPayment(data: Prisma.WorkerPaymentUncheckedCreateInput) {
    return prisma.workerPayment.create({ data });
  }

  async deletePayment(id: string) {
    return prisma.workerPayment.delete({ where: { id } });
  }
}

export const workerRepository = new WorkerRepository();
