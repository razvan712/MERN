import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js"; 

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); 
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const dbURL = `mongodb+srv://popescurazvanmihai94:${process.env.MONGO_PASSWORD}@dating.mwkh0hw.mongodb.net/dating?retryWrites=true&w=majority`;
 

mongoose.connect(dbURL,
{ 
    useNewUrlParser: true,  
    useUnifiedTopology: true,   
  } 
);   
 
app.listen(PORT, ()=> console.log("Server started at port 3001"));  