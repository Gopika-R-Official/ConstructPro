import { Request, Response, NextFunction } from 'express';
import { clientService } from '../services/client.service';

export const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json({ status: 'success', data: clients });
  } catch (error) { next(error); }
};

export const getClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const client = await clientService.getClientById(id);
    res.status(200).json({ status: 'success', data: client });
  } catch (error) { next(error); }
};

export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json({ status: 'success', data: client });
  } catch (error) { next(error); }
};

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const client = await clientService.updateClient(id, req.body);
    res.status(200).json({ status: 'success', data: client });
  } catch (error) { next(error); }
};

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await clientService.deleteClient(id);
    res.status(204).send();
  } catch (error) { next(error); }
};
