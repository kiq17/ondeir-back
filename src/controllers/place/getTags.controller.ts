import { Request, Response } from "express";
import { getTagsService } from "../../services/getTags.service";



export const getTags = async (req: Request, res: Response) => {
    try {
        const tags = await getTagsService()

        return res.status(200).json(tags);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}