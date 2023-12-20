import { Request, Response } from "express";
import { authToLoginPayload } from "../../utils/convert64";
import { editUserAvatarService } from "../../services/editUserAvatar.service";




export const editdUserAvatar = async (req: Request, res: Response) => {

    try {
        const { avatar } = req.body;

        const token = req.headers.authorization!;
        const authToken = token.replace("Bearer ", "");
        const payload = authToLoginPayload(authToken);

        await editUserAvatarService(avatar, payload.id);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}