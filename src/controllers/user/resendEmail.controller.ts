import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import Otp from "../../models/Otp";
import { emailTemplate } from "../../utils/fnReturnHtml";
import { loadEnvironmentVariable } from "../../utils/loadEnv";
import * as crypto from "crypto";
import nodemailer from "nodemailer";
import { findUserById } from "../../services/findUserById.service";

interface UserParams {
    userId?: string
}

export const resendEmailValidarion = validation((getSchema) => ({
    params: getSchema<UserParams>(yup.object().shape({
        userId: yup.string().required()
    }))

}))

export const resendEmail = async (req: Request<UserParams>, res: Response) => {
    try {
        const { userId } = req.params

        if(!userId) return res.status(404).json({message: "Dados inválidos"});

        const findedUser = await findUserById(userId);

        let transport = nodemailer.createTransport({
            host: loadEnvironmentVariable("EMAIL_SMTP"),
            port: 465,
            secure: true,
            auth: {
                user: loadEnvironmentVariable("EMAIL_USER"),
                pass: loadEnvironmentVariable("EMAIL_PASS"),
            },
            tls: { rejectUnauthorized: false }
        });

        let otp = Math.floor(1000 + Math.random() * 900000)

        while (otp.toString().length != 6) {
            otp = Math.floor(1000 + Math.random() * 900000)
        }

        await transport.sendMail({
            from: loadEnvironmentVariable("EMAIL_USER"),
            to: findedUser.email,
            subject: "Verificar conta",
            html: emailTemplate(findedUser.nome, otp.toString())
        });

        const abc = await Otp.create({
            otp,
            expiresAfter: Date.now(),
            tempLink: crypto.randomUUID(),
            userId: findedUser._id
        })


        return res.status(200).json();

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno servidor" });
    }
}