import mongoose from "mongoose";
import { MessageDataType } from "./message.type";

export interface IChatSchemaType extends Document{
    userId:mongoose.Schema.Types.ObjectId,
    sessionId:string,
    title:string,
    messages:MessageDataType[],
    isActive?:boolean,
    tags?:string[],
    summary?:string,
    createdAt:Date,
    updatedAt:Date,
    addMessage:(data:MessageDataType)=>void,
    getContext:(data:number)=>MessageDataType[]
}