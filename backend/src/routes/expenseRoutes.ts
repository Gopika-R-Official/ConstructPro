import { Router } from 'express';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../controllers/expenseController';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validate';
import { CreateExpenseSchema, UpdateExpenseSchema } from './schemas/expense.schema';

const router = Router();

router.use(authenticate);

router.get('/projects/:projectId/expenses', getExpenses);
router.post('/projects/:projectId/expenses', validate(CreateExpenseSchema), createExpense);
router.put('/expenses/:id', validate(UpdateExpenseSchema), updateExpense);
router.delete('/expenses/:id', deleteExpense);

export default router;
