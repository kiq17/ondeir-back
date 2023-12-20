import { Request, Response } from "express";
import { findPlace } from "../../services/findPlace.service";

interface PlaceParams {
    placeId?: string;
}

export const getOnePlace = async (req: Request<PlaceParams, {}, {}>, res: Response) => {
    try {
        if (!req.params.placeId) return res.status(404).send({ message: "Dados inválidos" });

        const place = await findPlace(req.params.placeId);

        return res.status(200).send(place);
    } catch (error) {
        return res.status(400).json({ message: "Lugar não encontrado" });
    }
}