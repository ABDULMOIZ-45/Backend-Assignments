import { Request, Response } from "express";
import Product from "../models/product-model";
import ProductBodySchema, {
  ProductPatchSchema,
} from "../validators/product-validator";

export async function createProduct(req: Request, res: Response) {
  try {
    const parsed = ProductBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        status: "error",
        message: parsed.error.issues[0].message,
      });
    }

    const product = await Product.create(parsed.data);

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await Product.find({
      deletedAt: null,
    });

    return res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getProductById(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      deletedAt: null,
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Invalid product id",
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const parsed = ProductPatchSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        status: "error",
        message: parsed.error.issues[0].message,
      });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      parsed.data,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const deletedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      {
        deletedAt: new Date(),
        isActive: false,
      },
      { new: true }
    );

    if (!deletedProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
