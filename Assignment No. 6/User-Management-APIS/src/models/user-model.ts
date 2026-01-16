import mongoose from "mongoose";
import { UserTypes } from "../@types/user-types";

const userSchema = new mongoose.Schema<UserTypes> ({
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true},
    role: {type: String, default: "user" },
    skills: [String],
    experience: {type: Number, min: 0 },
},
{
    timestamps: true,
}
);

export default mongoose.model<UserTypes>("user", userSchema);