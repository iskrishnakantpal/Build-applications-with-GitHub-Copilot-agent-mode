import { InferSchemaType, model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = model('Workout', workoutSchema);
