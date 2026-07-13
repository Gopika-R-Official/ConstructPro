import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes';
import clientRoutes from './routes/clientRoutes';
import projectRoutes from './routes/projectRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import expenseRoutes from './routes/expenseRoutes';
import paymentRoutes from './routes/paymentRoutes';
import workerRoutes from './routes/workerRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import subcontractorRoutes from './routes/subcontractorRoutes';
import materialRoutes from './routes/materialRoutes';
import reportsRoutes from './routes/reportsRoutes';

import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app: Express = express();

// Security & Optimization Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.use(compression());
app.use(express.json({ limit: '10kb' })); // Limit body size

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Request Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1', expenseRoutes); // Contains both /projects/:id/expenses and /expenses/:id
app.use('/api/v1', paymentRoutes); // Contains both /projects/:id/payments and /payments/:id
app.use('/api/v1', workerRoutes); // Contains /projects/:id/workers
app.use('/api/v1', attendanceRoutes); // Contains /projects/:id/attendance
app.use('/api/v1', subcontractorRoutes);
app.use('/api/v1', materialRoutes);
app.use('/api/v1/reports', reportsRoutes);

// Health Route for Cloud Deployments
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'ConstructPro API is running' });
});

// Handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
