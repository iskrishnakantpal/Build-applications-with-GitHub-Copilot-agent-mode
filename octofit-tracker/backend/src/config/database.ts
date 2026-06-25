import mongoose from 'mongoose';

const mongoHost = process.env.MONGO_HOST || '127.0.0.1';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoUri = process.env.MONGO_URI || `mongodb://${mongoHost}:${mongoPort}/octofit_db`;

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(mongoUri);
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};

export { mongoose, mongoUri };
