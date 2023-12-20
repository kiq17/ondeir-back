import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import Users from "../../models/Users";
import { hashSync } from "bcryptjs";

interface BodyUser {
    senha: string;
}

interface UserParams {
    userId?: string
}

export const validationRedefine = validation((getSchema) => ({
    body: getSchema<BodyUser>(yup.object().shape({
        senha: yup.string().min(6).required(),
    })),
    params: getSchema<UserParams>(yup.object().shape({
        userId: yup.string().required(),
    })),
}));

export const redefinePass = async (req: Request<UserParams, {}, BodyUser>, res: Response) => {

    try {
        const { senha } = req.body;

        const { userId } = req.params

        if(!userId) return res.status(400).json({message: "Dados inválidos"})

        const findUser = await Users.findById(userId)

        if(!findUser) return res.status(404).json();

        await Users.findByIdAndUpdate(userId, {
            $set:{
                senha: hashSync(senha)
            }
        })

        return res.status(204).json({});
    } catch (error) {
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}