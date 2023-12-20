import { Request, Response } from "express";
import nodemailer from "nodemailer";
import * as yup from "yup";
import { validation } from "../../middlewares/validation";
import { createUserService } from "../../services/createUser.service";
import { emailTemplate } from "../../utils/fnReturnHtml";
import Otp from "../../models/Otp";
import { loadEnvironmentVariable } from "../../utils/loadEnv";
import * as crypto from "crypto";

export interface BodyUser {
    nome: string;
    email: string;
    senha: string;
    estado: string;
}

export const validationUser = validation((getSchema) => ({
    body: getSchema<BodyUser>(yup.object().shape({
        nome: yup.string().min(3).required(),
        email: yup.string().required().email(),
        senha: yup.string().min(6).required(),
        estado: yup.string().min(3).required(),
    }))
}));

export const createUser = async (req: Request<{}, {}, BodyUser>, res: Response) => {
    try {
        const userCreated = await createUserService(req.body);

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
        
        while(otp.toString().length != 6){
            otp = Math.floor(1000 + Math.random() * 900000)
        }

        await transport.sendMail({
            from: loadEnvironmentVariable("EMAIL_USER"),
            to: req.body.email,
            subject: "Verificar conta",
            html: emailTemplate(req.body.nome, otp.toString())
        });

        const abc = await Otp.create({
            otp,
            expiresAfter: Date.now(),
            tempLink: crypto.randomUUID(),
            userId: userCreated._id
        })

        return res.status(201).json({userCreated, tempLink: abc.tempLink});
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return res.status(400).json({ message: { emailExist: error.message } });
        } else {
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}