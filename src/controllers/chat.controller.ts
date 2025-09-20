import router, { Request, Response } from "express"
import { validationResult } from "express-validator";
import Chat from "../models/chat.model"
import { generateUniqueId } from "../utils/generate-unique-id";
import { IChatSchemaType } from "../types/chat.schema.type";
import { MessageDataType } from "../types/message.type";
export const getQuickReplies = (req: Request, res: Response) => {
  const quickReplies = [
    "Hello! How can you help me today?",
    "What are your capabilities?",
    "Tell me a joke",
    "What's the weather like?",
    "Help me with a problem",
    "Explain something to me",
    "Thank you!",
    "Goodbye"
  ];
  res.json(quickReplies)

}

export const sendMessage = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: "Validation failed",
      details: errors.array()
    })
  }
  const {message,sessionId}=req.body;
  const userId = ( req as any).userId;
  let chat = await Chat.findOne({userId,isActive:true,sessionId})
  
  if(!chat){
    chat = new Chat({
      userId,
      sessionId:sessionId || generateUniqueId(),
      title: message.length > 50 ? message.substring(0,50)+"...":message
    })

  }
  const messageData = {role:'user',content:message} as MessageDataType;
  chat.addMessage(messageData);
  const context = chat.getContext(20);
  


}