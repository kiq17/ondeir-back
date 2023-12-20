import { Request, Response } from "express";
import { findPlace } from "../../services/findPlace.service";
import { reviewStarsService } from "../../services/reviewStars.service";
import { authToLoginPayload } from "../../utils/convert64";
import { Types } from "mongoose";

interface StarParams {
    star?: number;
    placeId?: string;
}

export const reviewStars = async (req: Request<StarParams>, res: Response) => {
    try {
        const { placeId, star } = req.params;
        const token = req.headers.authorization!;
        const authToken = token.replace("Bearer ", "");
        const payload = authToLoginPayload(authToken);

        if (!placeId || !star) return res.status(404).send({ message: "Dados inválidos" });

        const t = await findPlace(placeId);
        
        await reviewStarsService(+star, placeId, new Types.ObjectId(payload.id));

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}