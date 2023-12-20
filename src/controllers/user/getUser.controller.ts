import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import Places from "../../models/Places";
import Users from "../../models/Users";

interface UserParams {
    userId?: string
}

export const getUserValidarion = validation((getSchema) => ({
    params: getSchema<UserParams>(yup.object().shape({
        userId: yup.string().required()
    }))

}))

export const getUser = async (req: Request<UserParams>, res: Response) => {
    try {
        const { userId } = req.params

        if (!userId) return res.status(400).json({ message: "Dados inválidos" })

        const user = await Users.findById(userId, {
            nome: 1,
            avatar: 1,
            descricao: 1
        });

        if (user) {
            const placesByUser = await Places.find({
                criadoPor: user._id
            })
            return res.status(200).json({ 
                nome: user.nome,
                descricao: user.descricao, 
                avatar: user.avatar,
                postagens: placesByUser.length });
        }

        return res.status(400).json({ message: "Dados inválidos" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}