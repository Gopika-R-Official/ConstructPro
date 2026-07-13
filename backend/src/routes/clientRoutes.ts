import { Router } from 'express';
import { getClients, getClient, createClient, updateClient, deleteClient } from '../controllers/clientController';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validate';
import { CreateClientSchema, UpdateClientSchema } from './schemas/client.schema';

const router = Router();

router.use(authenticate);

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/', validate(CreateClientSchema), createClient);
router.put('/:id', validate(UpdateClientSchema), updateClient);
router.delete('/:id', deleteClient);

export default router;
