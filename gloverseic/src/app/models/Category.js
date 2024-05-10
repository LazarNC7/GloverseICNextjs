import {model, models, Schema} from "mongoose";
import { SubCategory } from "./SubCategory";
const {  default: mongoose } = require("mongoose");


const IngredientsSchema = new Schema({
  name: String,
  
});

const CategorySchema = new Schema({
  name: {type: String, required: true},
  subcategories: {type: [IngredientsSchema], required: true}
}, {timestamps: true});

export const Category = models?.Category || model('Category', CategorySchema);
