import express from 'express';
import dotenv from 'dotenv';
import process from 'node:process';
import programRoutes from './src/routes/programRoutes.js';
import groupRoutes from './src/routes/groupRoutes.js';
import childrenRoutes from './src/routes/childrenRoutes.js';
import parentRoutes from './src/routes/parentRoutes.js';
import invitationRoutes from './src/routes/invitationRoutes.js';
import attendanceRoutes from './src/routes/attendanceRoutes.js';
import modelRoutes from './src/routes/modelRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import progressionRoutes from './src/routes/progressionRoutes.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// Use routes
app.use('/api/programs', programRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/children', childrenRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/model', modelRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/progression', progressionRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});