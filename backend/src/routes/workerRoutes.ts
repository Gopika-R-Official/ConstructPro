import { Router } from 'express';
import { 
  getWorkersByProject, 
  createWorker, 
  getLabourLedger, 
  createWorkerPayment, 
  deleteWorkerPayment 
} from '../controllers/workerController';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validate';
import { CreateWorkerSchema, CreateWorkerPaymentSchema } from './schemas/worker.schema';

const router = Router();

router.use(authenticate);

router.get('/projects/:projectId/workers', getWorkersByProject);
router.post('/projects/:projectId/workers', validate(CreateWorkerSchema), createWorker);

router.get('/projects/:projectId/ledger', getLabourLedger);
router.post('/workers/:id/payments', validate(CreateWorkerPaymentSchema), createWorkerPayment);
router.delete('/worker-payments/:paymentId', deleteWorkerPayment);

export default router;
