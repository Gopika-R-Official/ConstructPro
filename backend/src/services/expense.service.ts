import { expenseRepository } from '../repositories/expense.repository';
import { projectRepository } from '../repositories/project.repository';
import { AppError } from '../utils/AppError';

export class ExpenseService {
  async getExpensesByProjectId(projectId: string) {
    return expenseRepository.findByProjectId(projectId);
  }

  async createExpense(projectId: string, data: any) {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return expenseRepository.create({
      projectId,
      amount: Number(data.amount),
      category: data.category,
      description: data.description,
      date: data.date ? new Date(data.date) : new Date(),
    });
  }

  async updateExpense(id: string, data: any) {
    const expense = await expenseRepository.findById(id);
    if (!expense) {
      throw new AppError('Expense not found', 404);
    }

    return expenseRepository.update(id, {
      amount: data.amount ? Number(data.amount) : undefined,
      category: data.category,
      description: data.description,
      date: data.date ? new Date(data.date) : undefined,
    });
  }

  async deleteExpense(id: string) {
    const expense = await expenseRepository.findById(id);
    if (!expense) {
      throw new AppError('Expense not found', 404);
    }

    return expenseRepository.softDelete(id);
  }
}

export const expenseService = new ExpenseService();
