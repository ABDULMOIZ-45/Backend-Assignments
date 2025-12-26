import mongoose from "mongoose";
import { ProductTypes}  from "../types/product-types";


const productSchema = new mongoose.Schema<ProductTypes>(
  {
    title: {type: String, required: true, trim: true},
    description: {type: String, trim: true,},
    price: {type: Number, required: true, min: 0},
    quantity: {type: Number, required: true, min: 0},
    category: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const productModel = mongoose.model<ProductTypes>("Product", productSchema);

export default productModel;
