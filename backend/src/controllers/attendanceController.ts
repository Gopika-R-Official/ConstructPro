import { Request, Response, NextFunction } from 'express';
import { attendanceService } from '../services/attendance.service';

export const getAttendanceByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId as string;
    const dateQuery = req.query.date as string;
    const attendances = await attendanceService.getAttendanceByDate(projectId, dateQuery);
    res.json(attendances);
  } catch (error) { next(error); }
};

export const upsertAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId as string;
    const { date, records } = req.body; 
    const results = await attendanceService.upsertAttendance(projectId, date, records);
    res.json({ message: 'Attendance saved successfully', count: results.length });
  } catch (error) { next(error); }
};
