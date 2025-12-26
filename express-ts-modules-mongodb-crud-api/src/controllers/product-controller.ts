import { Request, Response } from "express";
import productModel from "../models/product-model";

interface ReqBody {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

interface PayLoad {
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  category?: string;
}

export async function createProduct(
  req: Request<{}, {}, ReqBody>,
  res: Response
) {
  try {
    const { title, price, quantity, category } = req.body;

    if (!title || !price || !quantity || !category) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided!",
      });
    }

    const product = new productModel(req.body);
    const newProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error " + error,
    });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await productModel.find();

    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error " + error,
    });
  }
}

export async function getProductByID(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product found successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error " + error,
    });
  }
}

export async function updateProduct(
  req: Request<{ id: string }, {}, ReqBody>,
  res: Response
) {
  try {
    const isProductFound = await productModel.findById(req.params.id);

    if (!isProductFound) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    let PayLoad: PayLoad = {};

    if (req.body.title) PayLoad.title = req.body.title;
    if (req.body.description) PayLoad.description = req.body.description;
    if (req.body.price) PayLoad.price = req.body.price;
    if (req.body.quantity) PayLoad.quantity = req.body.quantity;
    if (req.body.category) PayLoad.category = req.body.category;

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      PayLoad,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error " + error,
    });
  }
}

export async function deleteProduct(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error " + error,
    });
  }
}
