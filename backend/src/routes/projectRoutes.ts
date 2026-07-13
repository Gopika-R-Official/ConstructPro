import { Router } from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { authenticate } from '../middleware/auth';
import { getProjectSubcontractors, createSubcontractor } from '../controllers/subcontractorController';
import { getProjectMaterials, createMaterial } from '../controllers/materialController';
import { getWorkersByProject, createWorker } from '../controllers/workerController';
import { getProjectSummary } from '../controllers/projectController';
import { validate } from '../utils/validate';
import { CreateProjectSchema, UpdateProjectSchema } from './schemas/project.schema';

const router = Router();

router.use(authenticate);

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', validate(CreateProjectSchema), createProject);
router.put('/:id', validate(UpdateProjectSchema), updateProject);
router.delete('/:id', deleteProject);

router.get('/:projectId/subcontractors', getProjectSubcontractors);
router.post('/:projectId/subcontractors', createSubcontractor);

router.get('/:projectId/materials', getProjectMaterials);
router.post('/:projectId/materials', createMaterial);

router.get('/:projectId/summary', authenticate, getProjectSummary);

export default router;
