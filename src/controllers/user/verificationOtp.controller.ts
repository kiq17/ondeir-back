import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import Otp from "../../models/Otp";
import Users from "../../models/Users";

interface VerifyParams {
    otp: string
}

export const otpValidarion = validation((getSchema) => ({
    body: getSchema<VerifyParams>(yup.object().shape({
        otp: yup.string().required()
    }))

}))

export const verifyOtp = async (req: Request<{}, {}, VerifyParams>, res: Response) => {
    try {
        const { otp } = req.body

        const findedOtp = await Otp.findOne({ otp });

        if (!findedOtp) throw ("Link expirado");

        await Users.findByIdAndUpdate(findedOtp.userId, {
            $set: {
                isActive: true
            }
        })

        await Otp.findByIdAndDelete(findedOtp._id);


        return res.status(200).json({user: findedOtp.userId});
    } catch (error) {
        return res.status(500).json({ message: "Código inválido" });
    }
}