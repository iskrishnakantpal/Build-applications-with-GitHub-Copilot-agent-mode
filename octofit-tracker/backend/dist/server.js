"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Team_1 = require("./models/Team");
const User_1 = require("./models/User");
const Workout_1 = require("./models/Workout");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: baseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const users = await User_1.UserModel.find().populate('team', 'name city').lean();
    res.json({ resource: 'users', count: users.length, items: users });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await Team_1.TeamModel.find().populate('createdBy', 'fullName email').lean();
    res.json({ resource: 'teams', count: teams.length, items: teams });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await Activity_1.ActivityModel.find()
        .sort({ performedAt: -1 })
        .populate('user', 'fullName email')
        .lean();
    res.json({ resource: 'activities', count: activities.length, items: activities });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await Leaderboard_1.LeaderboardModel.find({ period: 'weekly' })
        .sort({ rank: 1 })
        .populate('user', 'fullName')
        .populate('team', 'name')
        .lean();
    res.json({ resource: 'leaderboard', count: leaderboard.length, items: leaderboard });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await Workout_1.WorkoutModel.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();
    res.json({ resource: 'workouts', count: workouts.length, items: workouts });
});
app.use((error, _req, res, _next) => {
    console.error('API error:', error);
    res.status(500).json({ message: 'Internal server error' });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        app.listen(port, () => {
            console.log(`OctoFit backend running at ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend server:', error);
        process.exit(1);
    }
};
void startServer();
