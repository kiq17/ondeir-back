import { Request, Response } from "express";
import { findUserById } from "../../services/findUserById.service";
import { createCommentService } from "../../services/createComment.service";
import { authToLoginPayload } from "../../utils/convert64";
import { validation } from "../../middlewares/validation";
import * as yup from "yup";

export interface CommentBody {
    texto: string;
}

export interface CommentParams {
    placeId?: string;
}

export const validationComment = validation((getSchema)=>({
    body: getSchema<CommentBody>(yup.object().shape({
        texto: yup.string().min(3).required(),
    })),
    params: getSchema<CommentParams>(yup.object().shape({
        placeId: yup.string().required()
    }))
}))

export const createComment = async (req: Request<CommentParams, {}, CommentBody>, res: Response) => {
    try {
        const { placeId } = req.params;
        const token = req.headers.authorization!;
        const authToken = token.replace("Bearer ", "");
        const payload = authToLoginPayload(authToken);

        if(!placeId) return res.status(400).json({ message: "Dados inválidos" });

        await findUserById(payload.id);

        const comment = await createCommentService({
            ...req.body,
            userId: payload.id,
            placeId,
        });

        return res.status(200).json(comment);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}