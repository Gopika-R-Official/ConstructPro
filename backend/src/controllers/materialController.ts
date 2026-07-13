import { Request, Response, NextFunction } from 'express';
import { materialService } from '../services/material.service';

export const getProjectMaterials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await materialService.getProjectMaterials(req.params.projectId as string);
    res.json(data);
  } catch (error) { next(error); }
};

export const createMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const material = await materialService.createMaterial(req.params.projectId as string, req.body);
    res.status(201).json(material);
  } catch (error) { next(error); }
};

export const deleteMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await materialService.deleteMaterial(req.params.id as string);
    res.json({ message: 'Material log deleted' });
  } catch (error) { next(error); }
};

export const createMaterialPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await materialService.createMaterialPayment(req.params.id as string, req.body);
    res.status(201).json(payment);
  } catch (error) { next(error); }
};

export const deleteMaterialPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await materialService.deleteMaterialPayment(req.params.paymentId as string);
    res.json({ message: 'Payment deleted' });
  } catch (error) { next(error); }
};
