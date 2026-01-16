import { Request, Response, NextFunction } from "express";
import { jwtCompare } from "../helpers/jwt";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.status(404).json({
                success: false,
                message: "Token expired or invalid."
            })
        }
        const decoded = jwtCompare(token!);
        console.log(decoded);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Oops, something went wrong on our end. Please try again later." + error
        })
    }
}