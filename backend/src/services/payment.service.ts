import { paymentRepository } from '../repositories/payment.repository';
import { projectRepository } from '../repositories/project.repository';
import { AppError } from '../utils/AppError';

export class PaymentService {
  async getPaymentsByProjectId(projectId: string) {
    return paymentRepository.findByProjectId(projectId);
  }

  async createPayment(projectId: string, data: any) {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return paymentRepository.create({
      projectId,
      amount: Number(data.amount),
      method: data.method,
      description: data.description,
      date: data.date ? new Date(data.date) : new Date(),
    });
  }

  async updatePayment(id: string, data: any) {
    const payment = await paymentRepository.findById(id);
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    return paymentRepository.update(id, {
      amount: data.amount ? Number(data.amount) : undefined,
      method: data.method,
      description: data.description,
      date: data.date ? new Date(data.date) : undefined,
    });
  }

  async deletePayment(id: string) {
    const payment = await paymentRepository.findById(id);
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    return paymentRepository.softDelete(id);
  }
}

export const paymentService = new PaymentService();
