"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
dotenv_1.default.config();
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const seedDatabase = async () => {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        User_1.UserModel.deleteMany({}),
        Team_1.TeamModel.deleteMany({}),
        Activity_1.ActivityModel.deleteMany({}),
        Leaderboard_1.LeaderboardModel.deleteMany({}),
        Workout_1.WorkoutModel.deleteMany({}),
    ]);
    const users = await User_1.UserModel.insertMany([
        {
            fullName: 'Ava Martinez',
            email: 'ava.martinez@octofit.dev',
            age: 27,
            fitnessLevel: 'intermediate',
        },
        {
            fullName: 'Liam Chen',
            email: 'liam.chen@octofit.dev',
            age: 31,
            fitnessLevel: 'advanced',
        },
        {
            fullName: 'Noah Johnson',
            email: 'noah.johnson@octofit.dev',
            age: 24,
            fitnessLevel: 'beginner',
        },
        {
            fullName: 'Mia Wilson',
            email: 'mia.wilson@octofit.dev',
            age: 29,
            fitnessLevel: 'intermediate',
        },
    ]);
    const teams = await Team_1.TeamModel.insertMany([
        {
            name: 'Pulse Pirates',
            city: 'Bengaluru',
            createdBy: users[0]._id,
            memberCount: 2,
        },
        {
            name: 'Cardio Crushers',
            city: 'Pune',
            createdBy: users[1]._id,
            memberCount: 2,
        },
    ]);
    await User_1.UserModel.updateMany({ _id: { $in: [users[0]._id, users[2]._id] } }, { $set: { team: teams[0]._id } });
    await User_1.UserModel.updateMany({ _id: { $in: [users[1]._id, users[3]._id] } }, { $set: { team: teams[1]._id } });
    await Activity_1.ActivityModel.insertMany([
        {
            user: users[0]._id,
            type: 'running',
            durationMinutes: 45,
            caloriesBurned: 420,
            performedAt: new Date('2026-06-21T06:30:00.000Z'),
        },
        {
            user: users[1]._id,
            type: 'cycling',
            durationMinutes: 60,
            caloriesBurned: 560,
            performedAt: new Date('2026-06-22T05:15:00.000Z'),
        },
        {
            user: users[2]._id,
            type: 'strength',
            durationMinutes: 35,
            caloriesBurned: 300,
            performedAt: new Date('2026-06-22T17:45:00.000Z'),
        },
        {
            user: users[3]._id,
            type: 'yoga',
            durationMinutes: 50,
            caloriesBurned: 220,
            performedAt: new Date('2026-06-23T07:00:00.000Z'),
        },
        {
            user: users[0]._id,
            type: 'hiit',
            durationMinutes: 30,
            caloriesBurned: 380,
            performedAt: new Date('2026-06-24T06:00:00.000Z'),
        },
    ]);
    await Leaderboard_1.LeaderboardModel.insertMany([
        {
            period: 'weekly',
            user: users[1]._id,
            team: teams[1]._id,
            points: 920,
            rank: 1,
        },
        {
            period: 'weekly',
            user: users[0]._id,
            team: teams[0]._id,
            points: 860,
            rank: 2,
        },
        {
            period: 'weekly',
            user: users[3]._id,
            team: teams[1]._id,
            points: 740,
            rank: 3,
        },
        {
            period: 'weekly',
            user: users[2]._id,
            team: teams[0]._id,
            points: 680,
            rank: 4,
        },
    ]);
    await Workout_1.WorkoutModel.insertMany([
        {
            title: 'Starter Full Body Circuit',
            difficulty: 'beginner',
            targetMuscleGroup: 'Full Body',
            durationMinutes: 25,
            suggestedForFitnessLevel: 'beginner',
        },
        {
            title: 'Core and Mobility Flow',
            difficulty: 'beginner',
            targetMuscleGroup: 'Core',
            durationMinutes: 30,
            suggestedForFitnessLevel: 'beginner',
        },
        {
            title: 'Tempo Run Builder',
            difficulty: 'intermediate',
            targetMuscleGroup: 'Lower Body',
            durationMinutes: 40,
            suggestedForFitnessLevel: 'intermediate',
        },
        {
            title: 'Upper Body Strength Ladder',
            difficulty: 'intermediate',
            targetMuscleGroup: 'Upper Body',
            durationMinutes: 45,
            suggestedForFitnessLevel: 'intermediate',
        },
        {
            title: 'VO2 Max Sprint Blocks',
            difficulty: 'advanced',
            targetMuscleGroup: 'Lower Body',
            durationMinutes: 35,
            suggestedForFitnessLevel: 'advanced',
        },
        {
            title: 'Power Endurance Complex',
            difficulty: 'advanced',
            targetMuscleGroup: 'Full Body',
            durationMinutes: 50,
            suggestedForFitnessLevel: 'advanced',
        },
    ]);
    console.log('Seed completed successfully.');
    await mongoose_1.default.disconnect();
};
void seedDatabase().catch(async (error) => {
    console.error('Seed failed:', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
