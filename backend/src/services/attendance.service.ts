import { attendanceRepository } from '../repositories/attendance.repository';

export class AttendanceService {
  async getAttendanceByDate(projectId: string, dateString: string) {
    const startDate = new Date(dateString);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateString);
    endDate.setHours(23, 59, 59, 999);

    return attendanceRepository.findByProjectIdAndDateRange(projectId, startDate, endDate);
  }

  async upsertAttendance(projectId: string, dateString: string, records: any[]) {
    const targetDate = new Date(dateString);
    targetDate.setHours(12, 0, 0, 0); // Noon

    const results = [];
    for (const record of records) {
      const { workerId, status } = record;
      
      const startOfDay = new Date(dateString);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(dateString);
      endOfDay.setHours(23, 59, 59, 999);

      const existing = await attendanceRepository.findSpecific(projectId, workerId, startOfDay, endOfDay);

      if (existing) {
        const updated = await attendanceRepository.updateStatus(existing.id, status);
        results.push(updated);
      } else {
        const created = await attendanceRepository.create({
          projectId,
          workerId,
          date: targetDate,
          status
        });
        results.push(created);
      }
    }
    return results;
  }
}

export const attendanceService = new AttendanceService();
