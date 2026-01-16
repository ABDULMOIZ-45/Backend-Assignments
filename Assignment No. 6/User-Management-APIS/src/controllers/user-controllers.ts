import { Request, Response } from "express";
import { loginSchema, userSchema } from "../validators/userSchema";
import userModel from "../models/user-model";
import { comparePassword, hashingPassword } from "../helpers/hashing-password";
import { generatejwt } from "../helpers/jwt";

interface ReqBody {
    userName: string,
    email: string,
    role: string,
    skills: string[],
    experience: number,
    password: string
}

export async function createUser(req: Request, res: Response) {
    try {
        const { success, data, error} = userSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message
            })
        }

        const isFound = await userModel.findOne({email: data.email});
        if (isFound) {
            return res.status(400).json({
                success: false,
                message: "Oops, something went wrong. Please try again with a different email."
            })
        }

        const hashedPassword = await  hashingPassword(data.password);
        // console.log(hashedPassword);
        const user = new userModel({ userName: data.userName, email: data.email, experience: data.experience, skills: data.skills,
            password: hashedPassword, role: data.role
        });
        const newUser = user.save();

        res.status(200).json({
            success: true,
            message: "Success! Your account has been created.",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Oops, something went wrong on our end. Please try again later." + error
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { success, data, error } = loginSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message
            })
        }

        const isFound = await userModel.findOne({email: data.email});
        if (!isFound) {
            return res.status(404).json({
                success: false,
                message: "User not registered. Try signing up?"
            })
        }

        const isCorrect = await comparePassword(data.password, isFound.password);
        if (!isCorrect) {
            return res.status(400).json({
                success: false,
                Message: "Oops, password mismatch. Try again?"
            })
        }

        const payload = {
            name: isFound.userName,
            email: isFound.email,
            role: isFound.role
        }
        const accessToken = generatejwt(payload);
        res.status(200).json({
            success: true,
            message: "Login successful. Let's get started!",
            data: accessToken
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Oops, something went wrong on our end. Please try again later." + error
        })
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {

        const userList = await userModel.find();

        res.status(200).json({
            success: true,
            mesage: "All users data retrieved.Successfully",
            data: userList
        })
    } catch (error) {
         res.status(500).json({
            succes: false,
            message: "Oops, something went wrong on our end. Please try again later." + error
        })
    }
}


export async function getUserByID(req: Request, res: Response) {
    try {
        const { id } = req.params;
        
        const user = await userModel.findOne({_id: id});

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found ):"
            })
        }

        res.status(200).json({
            success: true,
            message: "User found! Details retrieved successfully.",
            data: user
        })
    } catch (error) {
         res.status(500).json({
            succes: false,
            message: "Oops, something went wrong on our end. Please try again later." + error
        })
    }
}

export async function userUpdate(req: Request<{id: string},{},ReqBody>, res: Response) {
    try {
        const isUserFound =await userModel.findOne({_id: req.params.id});

        if(!isUserFound) {
            return res.status(400).json({
                success: false,
                message: "User Not Found ):"
            })
        }

        let PayLoad: any = {};
        
        if (req.body.userName) {
            PayLoad.userName = req.body.userName;
        }
        if (req.body.email) {
            PayLoad.email = req.body.email;
        }
        if (req.body.experience) {
            PayLoad.experience = req.body.experience;
        }
        if (req.body.skills) {
            PayLoad.skills = req.body.skills;
        }

        const userUpdated = await userModel.findByIdAndUpdate({_id: req.params.id}, PayLoad, { new: true, runValidators: true})

        res.status(200).json({
            success: true,
            message: "User details updated successfully.",
            data: userUpdated
        }) 
    } catch (error) {
         res.status(500).json({
            succes: false,
            message: "Oops, something went wrong on our end. Please try again later." + error
        })
    }
}

export async function deleteUser(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: "Sorry, no user with this ID exists.",
      });
    }
    res.status(200).json({
      message: "User removed! Bye-bye.",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops, something went wrong on our end. Please try again later." + error
    });
  }
}
