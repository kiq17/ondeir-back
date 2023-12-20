import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import { createPlaceService } from "../../services/createPlace.service";
import { findUserById } from "../../services/findUserById.service";
import { MongooseError } from "mongoose";

export interface PlaceBody {
    titulo: string;
    descricao: string;
    tags: string[];
    imageFile: string[];
}

interface PlaceParams {
    userId?: string;
}

export const placeValidation = validation((getSchema) => ({
    body: getSchema<PlaceBody>(yup.object().shape({
        titulo: yup.string().min(6).required(),
        descricao: yup.string().required().max(2000),
        tags: yup.array().min(3).of(yup.string().min(3).required()).required(),
        imageFile: yup.array().max(3).of(yup.string().min(3).required()).required()
    })),
    params: getSchema<PlaceParams>(yup.object().shape({
        userId: yup.string().required()
    }))
}))

export const createPlace = async (req: Request<PlaceParams, {}, PlaceBody, {}>, res: Response) => {
    try {
        const { userId } = req.params;

        if(!userId) return res.status(400).json({ message: "Dados inválidos" });
        
        await findUserById(userId);
        
        const placeCreated = await createPlaceService({ ...req.body, userId }) 

        return res.status(201).json(placeCreated);
    } catch (error) {
        if (error instanceof MongooseError) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }
    }
}