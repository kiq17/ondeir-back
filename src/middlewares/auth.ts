import jwt from "jsonwebtoken";
import { loadEnvironmentVariable } from "../utils/loadEnv";
import { NextFunction, Request, Response } from "express";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).send({ message: "Token não existente" });
    }
    
    const authToken = token.replace("Bearer ", "");
    try {
        const authenticaded = jwt.verify(authToken, loadEnvironmentVariable("TOKEN_SECRET"));

        if (authenticaded) return next();
    } catch (error) {
        return res.status(500).send({ message: "Token inválido" });
    }
}