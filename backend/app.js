import express from 'express';
import dotenv from 'dotenv';
import process from 'node:process';
import programRoutes from './src/routes/programRoutes.js';
import groupRoutes from './src/routes/groupRoutes.js';
import childrenRoutes from './src/routes/childrenRoutes.js';
import parentRoutes from './src/routes/parentRoutes.js';
import invitationRoutes from './src/routes/invitationRoutes.js';
import attendanceRoutes from './src/routes/attendanceRoutes.js';

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


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});