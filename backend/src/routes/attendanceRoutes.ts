import { Router } from 'express';
import { getAttendanceByDate, upsertAttendance } from '../controllers/attendanceController';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validate';
import { GetAttendanceSchema, UpsertAttendanceSchema } from './schemas/attendance.schema';

const router = Router();

router.use(authenticate);

router.get('/projects/:projectId/attendance', validate(GetAttendanceSchema), getAttendanceByDate);
router.post('/projects/:projectId/attendance', validate(UpsertAttendanceSchema), upsertAttendance);

export default router;
