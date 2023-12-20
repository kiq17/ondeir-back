import { Request, Response } from "express";
import { getTagsService } from "../../services/getTags.service";
import { validation } from "../../middlewares/validation";
import * as yup from "yup"
import { getAllPlacesService } from "../../services/getAllPlaces.service";
interface PlacesQuery {
    limit?: number;
    page?: number;
    order?: "recente" | "melhor"
}

export const allPlacesValidation = validation((getSchema) => ({
    query: getSchema<PlacesQuery>(yup.object().shape({
        limit: yup.number().required(),
        page: yup.number().required(),
        order: yup.string<"recente" | "melhor">().required()
    }))
}))

export const getAllPlaces = async (req: Request<{}, {}, {}, PlacesQuery>, res: Response) => {
    try {

        const {limit, order, page} = req.query
        
        if(!page || !order || !limit) return res.status(404).json();

        const places = await getAllPlacesService(page, limit, order)

        return res.status(200).json(places);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}