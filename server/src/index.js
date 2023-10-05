import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js"; 


const app = express();

app.use(express.json()); 
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect("mongodb+srv://popescurazvanmihai94:Inuysha1@dating.mwkh0hw.mongodb.net/dating?retryWrites=true&w=majority",
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,  
  }
);  

app.listen(3001, ()=> console.log("Server started at port 3001"));  