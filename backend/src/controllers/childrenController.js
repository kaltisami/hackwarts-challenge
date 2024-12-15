import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createChild = async (req, res) => {
  try {
    const { name, groupId, birthDate, schoolLevel, parentId } = req.body;
    const child = await prisma.child.create({
      data: {
        name,
        birthDate,
        schoolLevel,
        group: {
          connect: { id: groupId }
        },
        parent: {
          connect: { id: parentId }
        }
      }
    });
    res.status(201).json(child);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to create child profile' });
  }
};

export const getChildren = async (req, res) => {
  try {
    const children = await prisma.child.findMany({
      include: { group: true }
    });
    res.json(children);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch children' });
  }
};

export const getChild = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || id.length !== 24) {
      throw new Error('Invalid ID format');
    }
    const child = await prisma.child.findUnique({
      where: { id: id }
    });
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    res.json(child);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to retrieve child profile' });
  }
};

export const updateChild = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, groupId, birthDate, schoolLevel } = req.body;
    const updatedChild = await prisma.child.update({
      where: { id },
      data: { name, groupId, birthDate, schoolLevel }
    });
    res.json(updatedChild);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to update child profile' });
  }
};

export const deleteChild = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.child.delete({ where: { id } });
    res.status(200).json({ message: 'Child profile deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to delete child profile' });
  }
};

export const getChildModels = async (req, res) => {
  try {
    const { id } = req.params;
    const models = await prisma.model.findMany({
      where: { childId: id }
    });
    res.json(models);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch child models' });
  }
};
