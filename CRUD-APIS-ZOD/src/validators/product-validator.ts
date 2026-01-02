import z from "zod";

const ProductBodySchema = z.object({
  title: z.string().min(3).trim(),
  description: z.string().min(10),
  price: z.number().positive().min(0),
  quantity: z.number().int().min(0),
  category: z.string().min(2),
  brand: z.string().default("Generic"),
  images: z.array(z.string()).default([]),
  rating: z.number().min(0).max(5).default(0),
  isActive: z.boolean().default(true),
});

export default ProductBodySchema;
export const ProductPatchSchema = ProductBodySchema.partial();
