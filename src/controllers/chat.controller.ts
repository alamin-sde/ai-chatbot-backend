import router, { Request, Response } from "express"
export const getQuickReplies=(req:Request,res:Response)=>{
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
  res.json({quickReplies})

}