import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import process from 'node:process';

const prisma = new PrismaClient();

// Function to create an invitation
export const createInvitation = async (req, res) => {
  try {
    const { email, childId } = req.body;
    
    // Generate a unique invitation code
    const invitationCode = crypto.randomBytes(16).toString('hex');
    
    // Create the invitation record in the database
    const invitation = await prisma.invitation.create({
      data: {
        email,
        invitationCode,
        expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: 'pending',
        childId
      }
    });

    // Send invitation email
    await sendInvitationEmail(email, invitationCode);

    res.status(201).json(invitation);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to create invitation' });
  }
};

// Function to send the invitation email
const sendInvitationEmail = async (email, invitationCode) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Invitation to Register',
    text: `You have been invited to register for the Young Engineers Club. Click the link to register: ${process.env.APP_URL}/register?code=${invitationCode}`,
  };

  await transporter.sendMail(mailOptions);
};

// Function to get all invitations
export const getInvitations = async (req, res) => {
  try {
    const invitations = await prisma.invitation.findMany();
    res.json(invitations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch invitations' });
  }
};

// Function to get a specific invitation by ID
export const getInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const invitation = await prisma.invitation.findUnique({
      where: { id }
    });
    
    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    res.json(invitation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch invitation' });
  }
};

// Function to delete an invitation by ID
export const deleteInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.invitation.delete({ where: { id } });
    
    res.status(200).json({ message: 'Invitation deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to delete invitation' });
  }
};
