import router, { Request, Response } from "express"
import { validationResult } from "express-validator";
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
  console.log(req.body)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: "Validation failed",
      details: errors.array()
    })
  }

}