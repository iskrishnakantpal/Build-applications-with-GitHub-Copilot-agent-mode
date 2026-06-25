"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    city: { type: String, required: true, trim: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    memberCount: { type: Number, required: true, min: 1 },
}, { timestamps: true });
exports.TeamModel = (0, mongoose_1.model)('Team', teamSchema);
