import { Document } from "mongoose"
export interface IUserSchema extends Document{
  username:string
  email:string
  password:string
  createdAt:Date
  updatedAt:Date,
  isActive:boolean,
  comparePassword(candidatePassword: string):Promise<boolean>
}