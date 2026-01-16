import { Request, Response } from "express";
import { userSchema } from "../validators/user-validators";
import userModel from "../models/user-model";
import { hashing } from "../helpers/hashing-password";
import { comparePassword } from "../helpers/hashing-password";

export async function createUser(req: Request, res: Response) {
    try {
        const { success, data, error } = userSchema.safeParse(req.body)

        if (!success) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message
            })
        }

        const isFound = await userModel.findOne({ email: data.email})
        if(isFound) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email! Please try with another email"
            })
        }
        const hashedPassword = await hashing(data.password);
        const user = new userModel({ userName: data.userName, email: data.email, experience: data.experience, skills: data.skills,
        password: hashedPassword });
        const newUser = user.save();

        res.status(200).json({
            success: true,
            message: "USer created successfully",
            data: newUser
        })
    } catch (error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error" + error
        })
    }
}