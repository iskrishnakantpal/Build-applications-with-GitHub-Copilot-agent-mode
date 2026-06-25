import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { ActivityModel } from './models/Activity';
import { LeaderboardModel } from './models/Leaderboard';
import { TeamModel } from './models/Team';
import { UserModel } from './models/User';
import { WorkoutModel } from './models/Workout';

dotenv.config();

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl: baseUrl });
});

app.get('/api/users', async (_req, res) => {
  const users = await UserModel.find().populate('team', 'name city').lean();
  res.json({ resource: 'users', count: users.length, items: users });
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await TeamModel.find().populate('createdBy', 'fullName email').lean();
  res.json({ resource: 'teams', count: teams.length, items: teams });
});

app.get('/api/activities', async (_req, res) => {
  const activities = await ActivityModel.find()
    .sort({ performedAt: -1 })
    .populate('user', 'fullName email')
    .lean();
  res.json({ resource: 'activities', count: activities.length, items: activities });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find({ period: 'weekly' })
    .sort({ rank: 1 })
    .populate('user', 'fullName')
    .populate('team', 'name')
    .lean();
  res.json({ resource: 'leaderboard', count: leaderboard.length, items: leaderboard });
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await WorkoutModel.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();
  res.json({ resource: 'workouts', count: workouts.length, items: workouts });
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('API error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`OctoFit backend running at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend server:', error);
    process.exit(1);
  }
};

void startServer();