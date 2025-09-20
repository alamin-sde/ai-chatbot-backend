import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import User from "../models/user.model"
import { DecodedTokenType } from "../types/token.decoded.type";
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    const decoded: DecodedTokenType = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as DecodedTokenType
    const user = await User.findOne({ _id: decoded.userId })
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    (req as any).userId= user.id
    next()
} 