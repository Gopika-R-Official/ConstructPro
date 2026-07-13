import { Request, Response, NextFunction } from 'express';
import { projectService } from '../services/project.service';

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) { next(error); }
};

export const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const project = await projectService.getProjectById(id);
    res.json(project);
  } catch (error) { next(error); }
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) { next(error); }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const project = await projectService.updateProject(id, req.body);
    res.json(project);
  } catch (error) { next(error); }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await projectService.deleteProject(id);
    res.status(204).send();
  } catch (error) { next(error); }
};

export const getProjectSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.projectId as string;
    const summary = await projectService.getProjectSummary(id);
    res.json(summary);
  } catch (error) { next(error); }
};
