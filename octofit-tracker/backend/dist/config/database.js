"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUri = exports.mongoose = exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const mongoHost = process.env.MONGO_HOST || '127.0.0.1';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoUri = process.env.MONGO_URI || `mongodb://${mongoHost}:${mongoPort}/octofit_db`;
exports.mongoUri = mongoUri;
const connectDatabase = async () => {
    await mongoose_1.default.connect(mongoUri);
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    await mongoose_1.default.disconnect();
};
exports.disconnectDatabase = disconnectDatabase;
