import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { findPlaceByUserId } from "../../services/findPlaceById.service";
import { findUserById } from "../../services/findUserById.service";
import { authToLoginPayload } from "../../utils/convert64";



export const getPlaceByUserId = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization!;
        const authToken = token.replace("Bearer ", "");
        const payload = authToLoginPayload(authToken);
        
        await findUserById(payload.id);

        const findByUser = await findPlaceByUserId(payload.id);

        return res.status(200).json(findByUser);
    } catch (error) {
        if (error instanceof MongooseError) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }
    }
}