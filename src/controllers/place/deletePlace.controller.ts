import { Response, Request } from "express";
import Places from "../../models/Places";


export const deletePlace = async (req: Request, res: Response)=>{
    try {
        const { placeId } = req.params;

        if (!placeId) {
            return res.status(400).json({ message: "Dados inválidos" });
        }

        await Places.findByIdAndDelete(placeId);

        res.status(200).json({ message: "Postagem excluída com sucesso" });

    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}