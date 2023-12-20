import { Request, Response } from "express";
import { getCommentsService } from "../../services/getComments.service";

interface getParams{
    placeId: string
}

export const getComments = async(req: Request<getParams,{},{}>, res: Response)=>{
    try {
        const placeId = req.params.placeId
        if(!placeId) return res.status(404).send({message: "Dados inválidos"});

        const comments = await getCommentsService(placeId);

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno servidor" });
    }
};  