import { Request, Response } from "express";
import { Types } from "mongoose";
import { toggleLikeService } from "../../services/toggleLikes.service";
import { authToLoginPayload } from "../../utils/convert64";
import { validation } from "../../middlewares/validation";
import * as yup from "yup";

interface likeParams {
    commentId?: string
}

interface likeBody{
    action: string
}

export const toggleValidation = validation(getSchema=>({
    params: getSchema<likeParams>(yup.object().shape({
        commentId: yup.string().required()
    })),
    body: getSchema<likeBody>(yup.object().shape({
        action: yup.string().max(500).required()
    }))
}))

export const toggleLike = async (req: Request<likeParams, {}, likeBody>, res: Response) => {
    try {
        const { commentId } = req.params
        
        const token = req.headers.authorization!;
        const authToken = token.replace("Bearer ", "");
        const payload = authToLoginPayload(authToken);

        if (!commentId) return res.status(404).send({ message: "Dados inválidos" });
        
        const comments = await toggleLikeService(new Types.ObjectId(payload.id), new Types.ObjectId(commentId), req.body.action)

        return res.status(200).json(comments);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno servidor" });
    }
};  