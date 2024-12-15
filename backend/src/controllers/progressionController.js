import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProgression = async (req, res) => {
  try {
    const { childId, activity, completedAt } = req.body;
    const progression = await prisma.progression.create({
      data: { childId, activity, completedAt }
    });
    res.status(201).json(progression);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to create progression' });
  }
};

export const getProgressionsByChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const progressions = await prisma.progression.findMany({
      where: { childId },
      orderBy: { completedAt: 'desc' }
    });
    res.json(progressions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch progressions' });
  }
};

export const getProgressionsByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const progressions = await prisma.progression.findMany({
      where: { child: { groupId } },
      include: { child: true },
      orderBy: { completedAt: 'desc' }
    });
    res.json(progressions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch group progressions' });
  }
};

export const generateProgressionReport = async (req, res) => {
  try {
    const { programId } = req.params;
    const program = await prisma.program.findUnique({
      where: { id: programId },
      include: {
        groups: {
          include: {
            children: {
              include: {
                progressions: true
              }
            }
          }
        }
      }
    });

    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    const report = program.groups.map(group => ({
      groupName: group.name,
      children: group.children.map(child => ({
        childName: child.name,
        completedActivities: child.progressions.length,
        lastActivity: child.progressions[0]?.activity || 'No activities completed'
      }))
    }));

    res.json({ programName: program.name, report });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to generate progression report' });
  }
};
