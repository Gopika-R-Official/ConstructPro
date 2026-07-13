import { Router } from 'express';
import { getWeeklyReport, getDailyReport } from '../controllers/reportsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/weekly', authenticate, getWeeklyReport);
router.get('/daily', authenticate, getDailyReport);

export default router;
