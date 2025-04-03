import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import blogRouter from './routes/blog.js';
import {config} from 'dotenv';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());

config({

path: './data/config.env'
}
)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL,{dbName:"mernblog"})
.then(() => console.log("MongoDB connected"))

app.use("/api/user", userRouter)
app.use("/api/blogs", blogRouter)
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))



app.listen(process.env.PORT, () =>
  console.log(`Server is running at http://localhost:${process.env.PORT}`))
