import { Document } from "mongoose";

interface ProductSchemaType extends Document {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  brand: string;
  rating: number;
  images: string[];
  isActive: boolean;
  deletedAt:  Date | null;
}

export default ProductSchemaType;