import { Request, Response } from "express"
import { validationResult } from "express-validator";
import Chat from "../models/chat.model"
import { generateUniqueId } from "../utils/generate-unique-id";
import { MessageDataType } from "../types/message.type";
import dotenv from "dotenv"
import OpenAI from "openai";
dotenv.config()
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
  const startTime = Date.now();
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: "Validation failed",
      details: errors.array()
    })
  }
  const { message, sessionId } = req.body;
  const userId = (req as any).userId;
  let chat = await Chat.findOne({ userId, isActive: true, sessionId })

  if (!chat) {
    chat = new Chat({
      userId,
      sessionId: generateUniqueId(),
      title: message.length > 50 ? message.substring(0, 50) + "..." : message
    })

  }
  const messageData = { role: 'user', content: message } as MessageDataType;
  chat.addMessage(messageData);
  const context = chat.getContext(20);
  try {
    const openai = new OpenAI({
      baseURL: process.env.OPENAI_API_URL,
      apiKey: process.env.OPENAI_API_KEY,
    });
    const model = process.env.OPENAI_API_MODEL as string;
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: process.env.OPENAI_API_PROMT
        },
        ...context as any
      ]
    });
    const aiResponse = completion?.choices[0]?.message?.content ?? "";
    const processingTime = Date.now() - startTime;
    const aiMessageData = {
      role: 'assistant',
      content: aiResponse,
      metaData: {
        tokens: 0,
        processingTime: processingTime,
        model: model
      },
      timestamp: new Date()
    } as MessageDataType
    chat.addMessage(aiMessageData)
    await chat.save()
    res.json({
      message: aiResponse,
      sessionId: chat.sessionId,
      timestamp: new Date()
    });

  } catch (error) {
    console.log(error)
  }


}




