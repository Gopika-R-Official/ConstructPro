import { Request, Response, NextFunction } from 'express';
import { reportsService } from '../services/reports.service';

export const getWeeklyReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, startDate, endDate } = req.query;

    if (!projectId || !startDate || !endDate) {
      return res.status(400).json({ error: 'projectId, startDate, and endDate are required' });
    }

    const start = new Date(startDate as string);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate as string);
    end.setHours(23, 59, 59, 999);

    const report = await reportsService.generateReport(projectId as string, start, end);
    
    // Transform keys slightly to match frontend expectations for WeeklyReport
    res.json({
      weekReceived: report.received,
      weekSpent: report.spent,
      labourCost: report.labourCost,
      materialsCost: report.materialsCost,
      dailyLabourCosts: report.dailyLabourCosts,
      breakdown: report.breakdown
    });
  } catch (error) {
    next(error);
  }
};

export const getDailyReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, date } = req.query;

    if (!projectId || !date) {
      return res.status(400).json({ error: 'projectId and date are required' });
    }

    const start = new Date(date as string);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date as string);
    end.setHours(23, 59, 59, 999);

    const report = await reportsService.generateReport(projectId as string, start, end);

    res.json({
      dayReceived: report.received,
      daySpent: report.spent,
      labourCost: report.labourCost,
      materialsCost: report.materialsCost,
      breakdown: report.breakdown
    });
  } catch (error) {
    next(error);
  }
};
