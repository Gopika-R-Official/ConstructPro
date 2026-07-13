import { Request, Response, NextFunction } from 'express';
import { expenseService } from '../services/expense.service';

export const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId as string;
    const expenses = await expenseService.getExpensesByProjectId(projectId);
    res.json(expenses);
  } catch (error) { next(error); }
};

export const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId as string;
    const expense = await expenseService.createExpense(projectId, req.body);
    res.status(201).json(expense);
  } catch (error) { next(error); }
};

export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const expense = await expenseService.updateExpense(id, req.body);
    res.json(expense);
  } catch (error) { next(error); }
};

export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await expenseService.deleteExpense(id);
    res.status(204).send();
  } catch (error) { next(error); }
};
