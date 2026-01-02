import mongoose from "mongoose";
import ProductSchemaType from "../types/product-types";

const productSchema: mongoose.Schema<ProductSchemaType> =
  new mongoose.Schema<ProductSchemaType>(
    {
      title: { type: String, required: true, unique: true, trim: true, minLength: 3 },
      description: { type: String, required: true, minLength: 10 },
      price: { type: Number, required: true, min: 0 },
      quantity: { type: Number, required: true, min: 0 },
      category: { type: String, required: true, trim: true, minlength: 2 },
      brand: { type: String, default: "Generic" },
      images: { type: [String], default: [] },
      rating: { type: Number, min: 0, max: 5, default: 0 },
      deletedAt: { type: Date, default: null,},
      isActive: { type: Boolean, default: true },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<ProductSchemaType>("Products", productSchema);