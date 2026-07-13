import { Request, Response, NextFunction } from 'express';
import { subcontractorService } from '../services/subcontractor.service';

export const getProjectSubcontractors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await subcontractorService.getProjectSubcontractors(req.params.projectId as string);
    res.json(data);
  } catch (error) { next(error); }
};

export const createSubcontractor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await subcontractorService.createSubcontractor(req.params.projectId as string, req.body);
    res.status(201).json(data);
  } catch (error) { next(error); }
};

export const getSubcontractorDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await subcontractorService.getSubcontractorDetails(req.params.id as string);
    res.json(data);
  } catch (error) { next(error); }
};

export const deleteSubcontractor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await subcontractorService.deleteSubcontractor(req.params.id as string);
    res.json({ message: 'Subcontractor deleted' });
  } catch (error) { next(error); }
};

export const createSubcontractorPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await subcontractorService.createSubcontractorPayment(req.params.id as string, req.body);
    res.status(201).json(payment);
  } catch (error) { next(error); }
};

export const deleteSubcontractorPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await subcontractorService.deleteSubcontractorPayment(req.params.paymentId as string);
    res.json({ message: 'Payment deleted' });
  } catch (error) { next(error); }
};
