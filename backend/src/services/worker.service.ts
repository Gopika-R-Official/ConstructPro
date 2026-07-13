import { workerRepository } from '../repositories/worker.repository';
import { projectRepository } from '../repositories/project.repository';
import { AppError } from '../utils/AppError';

export class WorkerService {
  async getWorkersByProjectId(projectId: string) {
    return workerRepository.findByProjectId(projectId);
  }

  async createWorker(projectId: string, data: any) {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return workerRepository.create({
      projectId,
      name: data.name,
      role: data.role,
      dailyWage: Number(data.dailyWage),
      phone: data.phone,
    });
  }

  async getLabourLedger(projectId: string, startDate: Date, endDate: Date) {
    const workers = await workerRepository.getLedgerData(projectId, startDate, endDate);

    let weekAccrued = 0;
    let weekPaid = 0;
    let weekBalance = 0;

    const formattedWorkers = workers.map(worker => {
      const daysWorked = worker.attendances.length;
      const earned = daysWorked * worker.dailyWage;
      const paid = worker.payments.reduce((sum, p) => sum + p.amount, 0);
      const balanceDue = earned - paid;

      weekAccrued += earned;
      weekPaid += paid;
      weekBalance += balanceDue;

      return {
        id: worker.id,
        name: worker.name,
        role: worker.role,
        dailyWage: worker.dailyWage,
        daysWorked,
        earned,
        paid,
        balanceDue,
        payments: worker.payments,
      };
    });

    return {
      weekAccrued,
      weekPaid,
      weekBalance,
      workers: formattedWorkers,
    };
  }

  async createWorkerPayment(workerId: string, data: any) {
    const worker = await workerRepository.findById(workerId);
    if (!worker) throw new AppError('Worker not found', 404);

    return workerRepository.createPayment({
      workerId,
      amount: Number(data.amount),
      method: data.method,
      date: data.date ? new Date(data.date) : new Date(),
    });
  }

  async deleteWorkerPayment(paymentId: string) {
    return workerRepository.deletePayment(paymentId);
  }
}

export const workerService = new WorkerService();
