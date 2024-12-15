import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createParent = async (req, res) => {
    try {
        const { name, email, password, registrationStatus } = req.body;
        const parent = await prisma.parent.create({
            data: { name, email, password, registrationStatus}
        });
        res.status(201).json(parent);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to create parent profile' });
    }
};

export const getParents = async (req, res) => {
    try {
        const parents = await prisma.parent.findMany();
        res.json(parents);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch parents' });
    }
}

export const getParent = async (req, res) => {
    try {
        const { id } = req.params;
        const parent = await prisma.parent.findUnique({
            where: { id }
        });
        if (!parent) {
            return res.status(404).json({ error: 'Parent not found' });
        }
        res.json(parent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch parent' });
    }
}

export const updateParent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updatedParent = await prisma.parent.update({
            where: { id },
            data: { name, email, password }
        });
        res.json(updatedParent);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to update parent profile' });
    }
}

export const deleteParent = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.parent.delete({
            where: { id }
        });
        res.json({ message: 'Parent deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to delete parent profile' });
    }
}

export const getParentChildren = async (req, res) => {
    try {
        const { id } = req.params;
        const children = await prisma.child.findMany({
            where: { parentId: id }
        });
        res.json(children);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch parent children' });
    }
}

export const getParentChild = async (req, res) => {
    try {
        const { parentId, childId } = req.params;
        const child = await prisma.child.findUnique({
            where: { id: childId, parentId }
        });
        if (!child) {
            return res.status(404).json({ error: 'Child not found' });
        }
        res.json(child);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch parent child' });
    }
}

