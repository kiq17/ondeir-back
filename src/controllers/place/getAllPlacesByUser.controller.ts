import { Request, Response } from "express";
import { getTagsService } from "../../services/getTags.service";
import { validation } from "../../middlewares/validation";
import * as yup from "yup"
import { getAllPlacesService } from "../../services/getAllPlaces.service";
import { getAllPlacesByUserService } from "../../services/getAllPlacesByUser.service";
import { authToLoginPayload } from "../../utils/convert64";

interface PlacesQuery {
    limit?: number;
    page?: number;
}

interface PlacesParams {
    userId?: string
}

export const allPlacesByUserValidation = validation((getSchema) => ({
    query: getSchema<PlacesQuery>(yup.object().shape({
        limit: yup.number().required(),
        page: yup.number().required(),
    })),
    params: getSchema<PlacesParams>(yup.object().shape({
        userId: yup.string().required()
    }))

}))

export const getAllPlacesByUser = async (req: Request<PlacesParams, {}, {}, PlacesQuery>, res: Response) => {
    try {

        const { limit, page } = req.query;
        const { userId } = req.params;

        if (!page || !limit || !userId) return res.status(404).json();

        const places = await getAllPlacesByUserService(page, limit, userId)

        return res.status(200).json(places);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}