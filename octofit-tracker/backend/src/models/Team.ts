import { InferSchemaType, model, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    city: { type: String, required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    memberCount: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;
export const TeamModel = model('Team', teamSchema);
