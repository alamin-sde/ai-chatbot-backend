import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../types/user.schema.type";
import { NextFunction } from "express";
import bcrypt  from "bcrypt"
const userSchema: Schema<IUserSchema> = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error)
    }


});
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword,this.password)

}

export default mongoose.model<IUserSchema>("User", userSchema);