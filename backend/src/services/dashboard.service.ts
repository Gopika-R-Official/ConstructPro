import { dashboardRepository } from '../repositories/dashboard.repository';

export class DashboardService {
  async getDashboardStats() {
    const activeProjects = await dashboardRepository.countActiveProjects();
    const totalClients = await dashboardRepository.countTotalClients();

    const recentExpenses = await dashboardRepository.getRecentExpenses(5);
    const recentPayments = await dashboardRepository.getRecentPayments(5);
    const recentAttendances = await dashboardRepository.getRecentAttendances(5);

    const actions = [
      ...recentExpenses.map(e => ({
        id: `exp-${e.id}`,
        type: 'expense',
        title: 'Expense added',
        subtitle: `${e.category} for ${e.project.name}`,
        amount: `₹${e.amount}`,
        date: e.createdAt,
        icon: 'dollar-sign',
        color: '#E11D48',
        bgColor: 'bg-rose-50'
      })),
      ...recentPayments.map(p => ({
        id: `pay-${p.id}`,
        type: 'payment',
        title: 'Payment received',
        subtitle: `From client for ${p.project.name}`,
        amount: `₹${p.amount}`,
        date: p.createdAt,
        icon: 'arrow-down-circle',
        color: '#10B981',
        bgColor: 'bg-emerald-50'
      })),
      ...recentAttendances.map(a => ({
        id: `att-${a.id}`,
        type: 'attendance',
        title: 'Attendance marked',
        subtitle: `${a.worker.name} at ${a.project.name} - ${a.status}`,
        amount: null,
        date: a.createdAt,
        icon: 'clipboard',
        color: '#4F46E5',
        bgColor: 'bg-indigo-50'
      }))
    ];

    actions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const recentActions = actions.slice(0, 5);

    return {
      activeProjects,
      totalClients,
      recentActions
    };
  }
}

export const dashboardService = new DashboardService();
