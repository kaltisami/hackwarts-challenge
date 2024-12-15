import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProgram = async (req, res) => {
  try {
    const { name, description, duration } = req.body;
    const program = await prisma.program.create({
      data: { name, description, duration }
    });
    res.status(201).json(program);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to create program' });
  }
};

export const getPrograms = async (req, res) => {
  try {
    const programs = await prisma.program.findMany();
    res.json(programs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
};

export const getProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await prisma.program.findUnique({
      where: { id },
      include: { groups: true }
    });
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch program' });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, duration } = req.body;
    const updatedProgram = await prisma.program.update({
      where: { id },
      data: { name, description, duration }
    });
    res.json(updatedProgram);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to update program' });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.program.delete({ where: { id } });
    res.status(201).json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to delete program' });
  }
};

export const getProgramProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await prisma.program.findUnique({
      where: { id },
      include: {
        groups: {
          include: {
            children: {
              include: {
                models: true
              }
            }
          }
        }
      }
    });
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    // Calculate progress here based on children's completed models
    res.json({ program, progress: 'Progress calculation logic here' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch program progress' });
  }
};
