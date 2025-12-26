import { Request, Response } from "express";
import userModel from "../models/user-model";

interface ReqBody {
    userName: string,
    email: string,
    role: string,
    skills: string[],
    experience: number
}

interface PayLoad {
    userName?: string,
    email?: string,
    role?: string,
    skills?: string[],
    experience?: number
}

export async function createUser(req: Request<{},{}, ReqBody>, res: Response) {
    try {
        const { email, experience, skills, userName } = req.body;
        
        if ( !email || !experience || !skills || !userName ) {
            return res.status(400).json({
                succes: false,
                message: "All fields are required!"
            })
        }
        const isFound = await userModel.findOne({email});

        if (isFound) {
            return res.status(400).json({
                succes: false,
                message: "Email already exists! Please try with different email "
            })
        }

        const user = new userModel(req.body);
        const newUser = await user.save()

        res.status(200).json({
            succes: true,
            message: "User created Succesfully",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Internal Server Error" + error
        })
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {

        const userList = await userModel.find();

        res.status(200).json({
            success: true,
            mesage: "All users Found Successfully",
            data: userList
        })
    } catch (error) {
         res.status(500).json({
            succes: false,
            message: "Internal Server Error" + error
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
            message: "User Found Successfully",
            data: user
        })
    } catch (error) {
         res.status(500).json({
            succes: false,
            message: "Internal Server Error" + error
        })
    }
}

export async function userUpdate(req: Request<{id: string},{},ReqBody>, res: Response) {
    try {
        // console.log("AB");
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

        const userUpdated = await userModel.findByIdAndUpdate({_id: req.params.id}, PayLoad, { new: true, runValidators: true})

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: userUpdated
        }) 
    } catch (error) {
         res.status(500).json({
            succes: false,
            message: "Internal Server Error" + error
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
        message: "Sorry, This ID name user not found in database.",
      });
    }
    res.status(200).json({
      message: "User removed successfully!",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}
    