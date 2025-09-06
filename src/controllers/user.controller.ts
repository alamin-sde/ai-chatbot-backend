import { Request,Response } from "express";
import User from "../models/user.model"
import { UserRegisterType } from "../types/register.type";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { LoginType } from "../types/login.type";
dotenv.config()
const generateToken=(userId:string)=>{
  return jwt.sign({userId},process.env.JWT_SECRET as string,{expiresIn:'7d'})
}
export const getUsers = (req:Request,res:Response)=>{
    res.json([
        {id:1,name:"Alamin Islam"},
        {id:2,name:"AI"}
    ])
}
export const createUser = async (req: Request, res: Response) => {
    try {
        const body: UserRegisterType = req.body
        const existingUser = await User.findOne({
            $or:[{email:body.email},{username:body.username}]
        })
        if (existingUser) {
            return res.status(400).json({
                error: existingUser.email === body.email
                    ? 'User with this email already exists'
                    : 'Username is already taken'
            });
        }
        const newUser = new User({ ...body, createdAt: new Date(), updatedAt: new Date() })
        await newUser.save();
        const token = generateToken(newUser._id as string)
        res.status(201).json({
            message: "User registered successfully",
            token:token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        }
        )
    } catch (error) {
        console.log('Failed to create new user for', error)
    }

}

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