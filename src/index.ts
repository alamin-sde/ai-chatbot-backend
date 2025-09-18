
import express from "express";
import dotenv from "dotenv"
import connectDB from "./utils/connection";
import swaggerDocs from "./utils/swagger";
import userRoutes from "./routes/user.route"
import authRoutes from "./routes/auth.route"
import chatRoutes from "./routes/chat.route"
import cors from "cors"
dotenv.config()
const PORT=process.env.PORT as any as number;
const base_url=process.env.BASE_URL;
const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(`${base_url}`,authRoutes)
app.use(`${base_url}`,userRoutes)
app.use(`${base_url}`,chatRoutes)

swaggerDocs(app,PORT);
const startServer=async()=>{
  try{
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }catch(error){
     console.error(" Failed to start server:", error);
     process.exit(1); 
  }
}
startServer()

