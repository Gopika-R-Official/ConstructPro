import { Request, Response, NextFunction } from 'express';
import { paymentService } from '../services/payment.service';

export const getPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId as string;
    const payments = await paymentService.getPaymentsByProjectId(projectId);
    res.json(payments);
  } catch (error) { next(error); }
};

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId as string;
    const payment = await paymentService.createPayment(projectId, req.body);
    res.status(201).json(payment);
  } catch (error) { next(error); }
};

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const payment = await paymentService.updatePayment(id, req.body);
    res.json(payment);
  } catch (error) { next(error); }
};

export const deletePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await paymentService.deletePayment(id);
    res.status(204).send();
  } catch (error) { next(error); }
};
