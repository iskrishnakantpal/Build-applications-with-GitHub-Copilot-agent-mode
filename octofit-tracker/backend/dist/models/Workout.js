"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    targetMuscleGroup: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    suggestedForFitnessLevel: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
}, { timestamps: true });
exports.WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
