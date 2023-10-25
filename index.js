const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const  dotenv =  require('dotenv');
dotenv.config();

const { userRouter } = require("./src/routes/users.js");
const { recipesRouter } =  require("./src/routes/recipes.js"); 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json()); 
app.use(cors({
  origin:'*'
}));

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const dbURL = `mongodb+srv://popescurazvanmihai94:${process.env.MONGO_PASSWORD}@dating.mwkh0hw.mongodb.net/dating?retryWrites=true&w=majority`;
 

mongoose.connect(dbURL,
{ 
    useNewUrlParser: true,  
    useUnifiedTopology: true,   
  } 
);   
 
app.listen(PORT, ()=> console.log("Server started at port 3001"));  