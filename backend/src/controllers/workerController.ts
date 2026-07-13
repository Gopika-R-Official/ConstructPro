import { Request, Response, NextFunction } from 'express';
import { workerService } from '../services/worker.service';

export const getWorkersByProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId as string;
    const workers = await workerService.getWorkersByProjectId(projectId);
    res.json(workers);
  } catch (error) { next(error); }
};

export const createWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId as string;
    const worker = await workerService.createWorker(projectId, req.body);
    res.status(201).json(worker);
  } catch (error) { next(error); }
};

export const getLabourLedger = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId as string;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    const ledger = await workerService.getLabourLedger(projectId, start, end);
    res.json(ledger);
  } catch (error) { next(error); }
};

export const createWorkerPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workerId = req.params.id as string;
    const payment = await workerService.createWorkerPayment(workerId, req.body);
    res.status(201).json(payment);
  } catch (error) { next(error); }
};

export const deleteWorkerPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paymentId = req.params.paymentId as string;
    await workerService.deleteWorkerPayment(paymentId);
    res.json({ message: 'Payment deleted' });
  } catch (error) { next(error); }
};
