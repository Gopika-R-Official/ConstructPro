import { subcontractorRepository } from '../repositories/subcontractor.repository';
import { projectRepository } from '../repositories/project.repository';
import { AppError } from '../utils/AppError';

export class SubcontractorService {
  async getProjectSubcontractors(projectId: string) {
    const subs = await subcontractorRepository.findByProjectId(projectId);

    return subs.map(sub => {
      const paidAmount = sub.payments.reduce((sum, payment) => sum + payment.amount, 0);
      const balance = sub.contractValue - paidAmount;
      return {
        ...sub,
        paidAmount,
        balance,
        paidPercentage: sub.contractValue > 0 ? Math.round((paidAmount / sub.contractValue) * 100) : 0
      };
    });
  }

  async createSubcontractor(projectId: string, data: any) {
    const project = await projectRepository.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);

    return subcontractorRepository.create({
      projectId,
      name: data.name,
      category: data.category,
      contractValue: Number(data.contractValue),
    });
  }

  async getSubcontractorDetails(id: string) {
    const sub = await subcontractorRepository.findById(id);
    if (!sub) throw new AppError('Subcontractor not found', 404);

    const paidAmount = sub.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const balance = sub.contractValue - paidAmount;
    
    return {
      ...sub,
      paidAmount,
      balance,
      paidPercentage: sub.contractValue > 0 ? Math.round((paidAmount / sub.contractValue) * 100) : 0
    };
  }

  async deleteSubcontractor(id: string) {
    const sub = await subcontractorRepository.findById(id);
    if (!sub) throw new AppError('Subcontractor not found', 404);
    return subcontractorRepository.softDelete(id);
  }

  async createSubcontractorPayment(subcontractorId: string, data: any) {
    const sub = await subcontractorRepository.findById(subcontractorId);
    if (!sub) throw new AppError('Subcontractor not found', 404);

    return subcontractorRepository.createPayment({
      subcontractorId,
      amount: Number(data.amount),
      method: data.method,
      date: data.date ? new Date(data.date) : new Date(),
    });
  }

  async deleteSubcontractorPayment(paymentId: string) {
    return subcontractorRepository.deletePayment(paymentId);
  }
}

export const subcontractorService = new SubcontractorService();
