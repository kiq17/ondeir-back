import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import { editUserService } from "../../services/editUser.service";
import { authToLoginPayload } from "../../utils/convert64";

interface BodyUser {
    nome: string;
    description: string;
}

export const editValidationUser = validation((getSchema) => ({
    body: getSchema<BodyUser>(yup.object().shape({
        nome: yup.string().min(3).required(),
        description: yup.string().min(3).required(),
    }))
}));

export const editUser = async (req: Request<{}, {}, BodyUser>, res: Response) => {

    try {
        const { description, nome } = req.body;

        const token = req.headers.authorization!;
        const authToken = token.replace("Bearer ", "");
        const payload = authToLoginPayload(authToken);

        await editUserService(nome, description, payload.id);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}