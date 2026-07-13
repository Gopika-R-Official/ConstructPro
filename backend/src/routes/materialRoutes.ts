import { Router } from 'express';
import {
  getProjectMaterials,
  createMaterial,
  deleteMaterial,
  createMaterialPayment,
  deleteMaterialPayment
} from '../controllers/materialController';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validate';
import { CreateMaterialSchema, CreateMaterialPaymentSchema } from './schemas/material.schema';

const router = Router();

router.use(authenticate);

router.get('/projects/:projectId/materials', getProjectMaterials);
router.post('/projects/:projectId/materials', validate(CreateMaterialSchema), createMaterial);

router.delete('/materials/:id', deleteMaterial);
router.post('/materials/:id/payments', validate(CreateMaterialPaymentSchema), createMaterialPayment);
router.delete('/materials/payments/:paymentId', deleteMaterialPayment);

export default router;
