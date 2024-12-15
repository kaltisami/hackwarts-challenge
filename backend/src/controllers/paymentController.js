import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPayment = async (req, res) => {
  try {
    const { amount, date, method, childId, groupId } = req.body;
    const payment = await prisma.payment.create({
      data: { amount, date, method, childId, groupId }
    });
    res.status(201).json(payment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to record payment' });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { child: true, group: true }
    });
    res.json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};

export const getPaymentsByChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const payments = await prisma.payment.findMany({
      where: { childId },
      orderBy: { date: 'desc' }
    });
    res.json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch child payments' });
  }
};

export const getPaymentsByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const payments = await prisma.payment.findMany({
      where: { groupId },
      orderBy: { date: 'desc' }
    });
    res.json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch group payments' });
  }
};

export const generateFinancialReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const payments = await prisma.payment.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      },
      include: { child: true, group: true }
    });
    
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    
    const report = {
      totalAmount,
      paymentCount: payments.length,
      payments: payments
    };
    
    res.json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to generate financial report' });
  }
};
