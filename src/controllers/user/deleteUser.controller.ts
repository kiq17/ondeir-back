import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import Users from "../../models/Users";
import Places from "../../models/Places";
import Comments from "../../models/Comments";

interface UserParams {
    userId?: string
}

export const getUserValidarion = validation((getSchema) => ({
    params: getSchema<UserParams>(yup.object().shape({
        userId: yup.string().required()
    }))

}))

export const deleteUser = async (req: Request<UserParams>, res: Response) => {
    try {
        const { userId } = req.params

        if(!userId) return res.status(400).json({message: "Dados inválidos"})

        await Places.deleteMany({
            criadoPor: userId
        })

        await Comments.deleteMany({
            userId
        })

        await Users.findByIdAndDelete(userId);

        return res.status(204).json({});
    } catch (error) {
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}