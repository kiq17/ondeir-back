import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import { updatePlaceService } from "../../services/updatePlace.service";
import { PlaceBody } from "./createPlace.controller";

interface EditPrams {
    placeId?: string
}

export const editValidation = validation((getSchema) => ({
    body: getSchema<PlaceBody>(yup.object().shape({
        titulo: yup.string().min(6).required(),
        descricao: yup.string().required().max(2000),
        tags: yup.array().min(3).of(yup.string().min(3).required()).required(),
        imageFile: yup.array().max(3).of(yup.string().min(3).required()).required()
    })),
    params: getSchema<EditPrams>(yup.object().shape({
        placeId: yup.string().required()
    }))
}))

export const editPlace = async (req: Request<EditPrams, {}, PlaceBody, {}>, res: Response) => {
    try {
        const { titulo, descricao, tags, imageFile } = req.body;
        const { placeId } = req.params;

        if (!placeId) {
            return res.status(400).json({ message: "Dados inválidos" });
        }

        /* if (imageFile.length > 4) {
            return
        } */

        await updatePlaceService(placeId, {
            descricao,
            tags,
            titulo,
            imageFile
        })

        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}