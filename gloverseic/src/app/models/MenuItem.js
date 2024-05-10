import mongoose, {model, models, Schema} from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const IngredientsSchema = new Schema({
  name: String,
  
});

const MenuItemSchema = new Schema({
  image: {type: String},
  name: {type: String},
  description: {type: String},
 // category: {type: mongoose.Types.ObjectId},
  basePrice: {type: Number},
  sizes: {type:[ExtraPriceSchema]},
  extraIngredientPrices: {type:[ExtraPriceSchema]},
  ingredients: {type:[IngredientsSchema]}
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);