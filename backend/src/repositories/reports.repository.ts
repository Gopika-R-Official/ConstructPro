import prisma from '../config/db';

export class ReportsRepository {
  async getClientPayments(projectId: string, start: Date, end: Date) {
    return prisma.payment.findMany({
      where: { projectId, date: { gte: start, lte: end }, deletedAt: null }
    });
  }

  async getWorkerPayments(projectId: string, start: Date, end: Date) {
    return prisma.workerPayment.findMany({
      where: { worker: { projectId }, date: { gte: start, lte: end } }
    });
  }

  async getMaterialPayments(projectId: string, start: Date, end: Date) {
    return prisma.materialPayment.findMany({
      where: { material: { projectId }, date: { gte: start, lte: end } }
    });
  }

  async getSubcontractorPayments(projectId: string, start: Date, end: Date) {
    return prisma.subcontractorPayment.findMany({
      where: { subcontractor: { projectId }, date: { gte: start, lte: end } }
    });
  }

  async getOtherExpenses(projectId: string, start: Date, end: Date) {
    return prisma.expense.findMany({
      where: { projectId, date: { gte: start, lte: end }, deletedAt: null }
    });
  }
}

export const reportsRepository = new ReportsRepository();
