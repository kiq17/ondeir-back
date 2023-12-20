import { compareSync } from "bcryptjs";
import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import { findUserById } from "../../services/findUserById.service";
import { newPasswordService } from "../../services/newPassword.service";
import { authToLoginPayload } from "../../utils/convert64";

interface BodyUser {
    senha: string;
    novaSenha: string;
}

export const validationPass = validation((getSchema) => ({
    body: getSchema<BodyUser>(yup.object().shape({
        senha: yup.string().min(6).required(),
        novaSenha: yup.string().min(6).required(),
    }))
}));

export const newPassword = async (req: Request<{}, {}, BodyUser>, res: Response) => {

    try {
        const { senha, novaSenha } = req.body;

        const token = req.headers.authorization!;
        const authToken = token.replace("Bearer ", "");
        const payload = authToLoginPayload(authToken);

        const findUser = await findUserById(payload.id)

        if(compareSync(senha, findUser.senha)){
            await newPasswordService(novaSenha, payload.id);
    
            return res.status(204).json();
        }


        return res.status(400).json({});
    } catch (error) {
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}