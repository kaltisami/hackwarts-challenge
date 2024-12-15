import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createModel = async (req, res) => {
  try {
    const { name, childId, programId } = req.body;
    const model = await prisma.model.create({
      data: { name, childId, programId }
    });
    res.status(201).json(model);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to create model' });
  }
};

export const getModels = async (req, res) => {
  try {
    const models = await prisma.model.findMany({
      include: { child: true, program: true }
    });
    res.json(models);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch models' });
  }
};

export const getModelsByChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const models = await prisma.model.findMany({
      where: { childId },
      include: { program: true }
    });
    res.json(models);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch child models' });
  }
};

export const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrls } = req.body;
    const updatedModel = await prisma.model.update({
      where: { id },
      data: { name, imageUrls }
    });
    res.json(updatedModel);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to update model' });
  }
};

export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.model.delete({ where: { id } });
    res.status(200).json({ message: 'Model deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to delete model' });
  }
};

export const getRemainingModels = async (req, res) => {
  try {
    const { childId, programId } = req.params;
    const allProgramModels = await prisma.model.findMany({
      where: { programId }
    });
    const completedModels = await prisma.model.findMany({
      where: { childId, programId }
    });
    const remainingModels = allProgramModels.filter(model => 
      !completedModels.some(completed => completed.name === model.name)
    );
    res.json(remainingModels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch remaining models' });
  }
};
