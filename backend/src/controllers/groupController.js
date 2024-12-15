import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createGroup = async (req, res) => {
  try {
    const { name, schedule_day, schedule_time, programId } = req.body;
    const group = await prisma.group.create({
      data: { name, schedule_day, schedule_time, programId }
    });
    res.status(201).json(group);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to create group' });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await prisma.group.findMany({
      include: { program: true }
    });
    res.json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};

export const getGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await prisma.group.findUnique({
      where: { id },
      include: { program: true, children: true }
    });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch group' });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, schedule_day, schedule_time, programId } = req.body;
    const updatedGroup = await prisma.group.update({
      where: { id },
      data: { name, schedule_day, schedule_time, programId }
    });
    res.json(updatedGroup);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to update group' });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.group.delete({ where: { id } });
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to delete group' });
  }
};

export const getGroupChildren = async (req, res) => {
  try {
    const { id } = req.params;
    const children = await prisma.child.findMany({
      where: { groupId: id },
      include: { models: true }
    });
    res.json(children);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch group children' });
  }
};
