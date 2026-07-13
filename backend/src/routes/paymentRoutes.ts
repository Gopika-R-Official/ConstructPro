import { Router } from 'express';
import { getPayments, createPayment, updatePayment, deletePayment } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validate';
import { CreatePaymentSchema, UpdatePaymentSchema } from './schemas/payment.schema';

const router = Router();

router.use(authenticate);

router.get('/projects/:projectId/payments', getPayments);
router.post('/projects/:projectId/payments', validate(CreatePaymentSchema), createPayment);
router.put('/payments/:id', validate(UpdatePaymentSchema), updatePayment);
router.delete('/payments/:id', deletePayment);

export default router;
