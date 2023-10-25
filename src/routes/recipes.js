const express = require("express");

const  { RecipesModel } = require("../models/Recipes.js");
const  { UserModel } = require("../models/Users.js");
const { verifyToken } = require("../middleware/verifyToken.js");


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
 

router.post("/", verifyToken, async (req, res) => { 
    const recipe = new RecipesModel(req.body);
    try {
        const result = await recipe.save();
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}
); 

router.put("/", verifyToken, async (req, res) => {
   

    try {
      const recipe = await RecipesModel.findById(req.body.recipeID);
      const user = await UserModel.findById(req.body.userID);
  
        user.savedRecipes.push(recipe);
        await user.save();
      
        res.json({savedRecipes: user.savedRecipes});
        console.log(user.savedRecipes, 'uuuu'); 
    } catch (err) {
        res.status(500).json(err);
    }
}
); 

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userID);
      res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get("/savedRecipes/:userID", async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipesModel.find({ _id: { $in: user.savedRecipes } });
        res.json({ savedRecipes }); 
    } catch (err) {
        res.status(500).json(err);
    }
}
);

 
 
module.exports = { recipesRouter: router };  