import { Request, Response } from "express";
import nodemailer from "nodemailer";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import Otp from "../../models/Otp";
import Users from "../../models/Users";
import { loadEnvironmentVariable } from "../../utils/loadEnv";
import { emailTemplatePass } from "../../utils/redefinePassHtml";
import * as crypto from "crypto";

export interface BodyUser {
    email: string;
}

export const validationResend = validation((getSchema) => ({
    body: getSchema<BodyUser>(yup.object().shape({
        email: yup.string().required().email(),
    }))
}));

export const forgetPass = async (req: Request<{}, {}, BodyUser>, res: Response) => {
    try {
        const { email } = req.body
        const findUser = await Users.findOne({ email })

        if (!findUser) {
            throw new Error("Esse email não existe");
        }

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
            to: req.body.email,
            subject: "Redefinir senha",
            html: emailTemplatePass(findUser.nome, otp.toString())
        });

        const abc = await Otp.create({
            otp,
            expiresAfter: Date.now(),
            tempLink: crypto.randomUUID(),
            userId: findUser._id
        })

        return res.status(200).json({ findUser, tempLink: abc.tempLink });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: { emailExist: error.message } });
        } else {
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}