import prisma from '../config/db';

export class AttendanceRepository {
  async findByProjectIdAndDateRange(projectId: string, startDate: Date, endDate: Date) {
    return prisma.attendance.findMany({
      where: {
        projectId,
        date: { gte: startDate, lte: endDate },
        deletedAt: null,
      },
    });
  }

  async findSpecific(projectId: string, workerId: string, startDate: Date, endDate: Date) {
    return prisma.attendance.findFirst({
      where: {
        projectId,
        workerId,
        date: { gte: startDate, lte: endDate },
        deletedAt: null,
      }
    });
  }

  async create(data: any) {
    return prisma.attendance.create({ data });
  }

  async updateStatus(id: string, status: string) {
    return prisma.attendance.update({
      where: { id },
      data: { status },
    });
  }
}

export const attendanceRepository = new AttendanceRepository();
