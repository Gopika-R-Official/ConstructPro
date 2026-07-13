import { Router } from 'express';
import {
  getProjectSubcontractors,
  createSubcontractor,
  getSubcontractorDetails,
  deleteSubcontractor,
  createSubcontractorPayment,
  deleteSubcontractorPayment
} from '../controllers/subcontractorController';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validate';
import { CreateSubcontractorSchema, CreateSubcontractorPaymentSchema } from './schemas/subcontractor.schema';

const router = Router();

router.use(authenticate);

router.get('/projects/:projectId/subcontractors', getProjectSubcontractors);
router.post('/projects/:projectId/subcontractors', validate(CreateSubcontractorSchema), createSubcontractor);

router.get('/subcontractors/:id', getSubcontractorDetails);
router.delete('/subcontractors/:id', deleteSubcontractor);

router.post('/subcontractors/:id/payments', validate(CreateSubcontractorPaymentSchema), createSubcontractorPayment);
router.delete('/subcontractor-payments/:paymentId', deleteSubcontractorPayment);

export default router;
