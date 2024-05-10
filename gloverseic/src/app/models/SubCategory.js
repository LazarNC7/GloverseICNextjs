const { Schema, model, models, default: mongoose } = require("mongoose");
import Category from "./Category"

const SubCategorySchema=new Schema({
    name:{type:String, required:true},
    
});

export const SubCategory = models?.SubCategory || model('SubCategory', SubCategorySchema);
