import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class ExpenseRepository {
  async findByProjectId(projectId: string) {
    return prisma.expense.findMany({
      where: { projectId, deletedAt: null },
      orderBy: { date: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.expense.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async create(data: Prisma.ExpenseUncheckedCreateInput) {
    return prisma.expense.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ExpenseUpdateInput) {
    return prisma.expense.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.expense.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const expenseRepository = new ExpenseRepository();
