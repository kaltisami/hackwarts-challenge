import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const markAttendance = async (req, res) => {
  try {
    const { childId, date, status } = req.body;
    const attendance = await prisma.attendance.create({
      data: { childId, date, status }
    });
    res.status(201).json(attendance);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to mark attendance' });
  }
};

export const getAttendanceByChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const attendance = await prisma.attendance.findMany({
      where: { childId },
      orderBy: { date: 'desc' }
    });
    res.json(attendance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
};

export const getAttendanceByGroup = async (req, res) => {
  try {
    const { groupId, date } = req.query;
    const attendance = await prisma.attendance.findMany({
      where: {
        child: { groupId },
        date: date ? new Date(date) : undefined
      },
      include: { child: true }
    });
    res.json(attendance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch group attendance' });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedAttendance = await prisma.attendance.update({
      where: { id },
      data: { status }
    });
    res.json(updatedAttendance);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to update attendance' });
  }
};
