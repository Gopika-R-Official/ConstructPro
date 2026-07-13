import prisma from '../config/db';

export class DashboardRepository {
  async countActiveProjects() {
    return prisma.project.count({
      where: { status: 'Active', deletedAt: null },
    });
  }

  async countTotalClients() {
    return prisma.client.count({
      where: { deletedAt: null },
    });
  }

  async getRecentExpenses(limit: number = 5) {
    return prisma.expense.findMany({
      take: limit,
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { project: { select: { name: true } } },
    });
  }

  async getRecentPayments(limit: number = 5) {
    return prisma.payment.findMany({
      take: limit,
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { project: { select: { name: true } } },
    });
  }

  async getRecentAttendances(limit: number = 5) {
    return prisma.attendance.findMany({
      take: limit,
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { worker: { select: { name: true } }, project: { select: { name: true } } },
    });
  }
}

export const dashboardRepository = new DashboardRepository();
