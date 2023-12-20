import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import Otp from "../../models/Otp";

interface UserParams {
    temp?: string
}

export const checkTempValidarion = validation((getSchema) => ({
    params: getSchema<UserParams>(yup.object().shape({
        temp: yup.string().required()
    }))

}))

export const checkTempLink = async (req: Request<UserParams>, res: Response) => {
    try {
        const { temp } = req.params

        if (!temp) return res.status(400).json({ message: "Dados inválidos" })

        const findedOtp = await Otp.findOne({ tempLink: temp });
        
        if(!findedOtp) throw("Link expirado");
        

        return res.status(200).json({id: findedOtp.userId});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}