import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../types/user.schema.type";
const userSchema:Schema<IUserSchema> = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    }
})
userSchema.methods.comparePassword=async function(candidatePassword:string){
    console.log("candidate password-->",candidatePassword)
    return candidatePassword==this.password

}

export default mongoose.model<IUserSchema>("User", userSchema);