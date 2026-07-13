import { reportsRepository } from '../repositories/reports.repository';

export class ReportsService {
  async generateReport(projectId: string, startDate: Date, endDate: Date) {
    const clientPayments = await reportsRepository.getClientPayments(projectId, startDate, endDate);
    const received = clientPayments.reduce((sum, p) => sum + p.amount, 0);

    const workerPayments = await reportsRepository.getWorkerPayments(projectId, startDate, endDate);
    const labourWages = workerPayments.reduce((sum, p) => sum + p.amount, 0);

    const dailyLabourCosts = [0, 0, 0, 0, 0, 0, 0];
    workerPayments.forEach(p => {
      const d = new Date(p.date);
      let dayIndex = d.getDay() - 1;
      if (dayIndex === -1) dayIndex = 6;
      dailyLabourCosts[dayIndex] += p.amount;
    });

    const materialPayments = await reportsRepository.getMaterialPayments(projectId, startDate, endDate);
    const materialPurchases = materialPayments.reduce((sum, p) => sum + p.amount, 0);

    const subcontractorPayments = await reportsRepository.getSubcontractorPayments(projectId, startDate, endDate);
    const subcontractorsPaid = subcontractorPayments.reduce((sum, p) => sum + p.amount, 0);

    const otherExpensesList = await reportsRepository.getOtherExpenses(projectId, startDate, endDate);
    const otherMiscExpenses = otherExpensesList.reduce((sum, e) => sum + e.amount, 0);

    const totalSpent = labourWages + materialPurchases + subcontractorsPaid + otherMiscExpenses;

    return {
      received,
      spent: totalSpent,
      labourCost: labourWages,
      materialsCost: materialPurchases,
      dailyLabourCosts, // only meaningful for weekly report but safe to return
      breakdown: {
        labourWages,
        materialPurchases,
        subcontractorsPaid,
        otherMiscExpenses,
        totalSpent
      }
    };
  }
}

export const reportsService = new ReportsService();
