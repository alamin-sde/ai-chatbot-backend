import { Request, Response } from "express";
import User from "../models/user.model"
import { UserRegisterType } from "../types/register.type";
import { LoginType } from "../types/login.type";
import { generateToken } from "../middleware/generateToken";



export const createUser = async (req: Request, res: Response) => {
    try {
        const body: UserRegisterType = req.body
        const existingUser = await User.findOne({
            $or: [{ email: body.email }, { username: body.username }]
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
            token: token,
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

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({
            isActive: true
        })
        res.status(200).json({ message: "List fetched successfully", userList: users })

    } catch (error) {
        console.log("Failed to fetch all users due to", error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find({
            isActive: true
        })
        res.status(200).json({ message: "List fetched successfully", userList: users })

    } catch (error) {
        console.log("Failed to fetch all users due to", error);
    }
}

