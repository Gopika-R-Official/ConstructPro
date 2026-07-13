import { projectRepository } from '../repositories/project.repository';
import { clientRepository } from '../repositories/client.repository';
import { AppError } from '../utils/AppError';

export class ProjectService {
  async getAllProjects() {
    return projectRepository.findAll();
  }

  async getProjectById(id: string) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    return project;
  }

  async createProject(data: any) {
    const client = await clientRepository.findById(data.clientId);
    if (!client) {
      throw new AppError('Client not found', 404);
    }

    return projectRepository.create({
      name: data.name,
      clientId: data.clientId,
      status: data.status || 'Active',
      budget: data.budget ? Number(data.budget) : 0,
      startDate: data.startDate ? new Date(data.startDate) : new Date(),
    });
  }

  async updateProject(id: string, data: any) {
    await this.getProjectById(id);
    return prisma.project.update({ where: { id }, data });
  }

  async deleteProject(id: string) {
    await this.getProjectById(id);
    return prisma.project.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async getProjectSummary(id: string) {
    const project = await this.getProjectById(id);
    return project;
  }
}

import prisma from '../config/db';
export const projectService = new ProjectService();
