import { Request,Response } from "express";
import User from "../models/user.model"
import { UserRegisterType } from "../types/register.type";
import { LoginType } from "../types/login.type";
import { generateToken } from "../middleware/generateToken";

export const login = async (req: Request, res: Response) => {
    try {
        const body: LoginType = req.body
        const user = await User.findOne({
            $or:[{email:body.username},{username:body.username}]
        })
        if (!user) {
            return res.status(404).json({error:"User not found"});
        }
        const isPasswordValid = await user.comparePassword(body.password)
        if(!isPasswordValid){
            return res.status(401).json({error:"Invalid credentials"});
        }

        const token = generateToken(user._id as string)
        res.status(201).json({
            message: "Login successful",
            token:token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }
        )
    } catch (error) {
        console.log('Failed to create new user for', error)
    }

}