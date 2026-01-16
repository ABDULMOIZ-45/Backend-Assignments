import { Request, Response, NextFunction } from "express";

export function globalError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error("❌ Error:", err.message);
    next();
}