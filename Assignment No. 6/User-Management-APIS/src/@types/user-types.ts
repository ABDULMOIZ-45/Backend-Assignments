import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export interface UserTypes extends Document {
    userName: string,
    email: string,
    password: string,
    role: "admin" | "user",
    skills: string[],
    experience: number
} 

declare global {
  namespace Express {
    interface Request {
      user?: any | JwtPayload;
    }
  }
}
