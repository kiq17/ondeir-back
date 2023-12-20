import { Request, Response } from "express";
import { validation } from "../../middlewares/validation";
import * as yup from "yup";
import { loginService } from "../../services/login.service";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { loadEnvironmentVariable } from "../../utils/loadEnv";
import { emailTemplate } from "../../utils/fnReturnHtml";
import Otp from "../../models/Otp";
import nodemailer from "nodemailer";
import * as crypto from "crypto";

export interface loginBody {
    email: string;
    password: string;
}

export const loginValidation = validation((getSchema) => ({
    body: getSchema<loginBody>(yup.object().shape({
        email: yup.string().required(),
        password: yup.string().min(6).required(),
    }))
}));

export const login = async (req: Request<{}, {}, loginBody>, res: Response) => {
    const { password } = req.body;

    try {
        const userCheck = await loginService(req.body.email);

        if (!userCheck.isActive) {
            const findOtp = await Otp.findOne({
                userId: userCheck._id
            })

            if(findOtp){
                return res.status(401).json({tempLink: findOtp.tempLink})
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
            
            while(otp.toString().length != 6){
                otp = Math.floor(1000 + Math.random() * 900000)
            }
    
            await transport.sendMail({
                from: loadEnvironmentVariable("EMAIL_USER"),
                to: req.body.email,
                subject: "Verificar conta",
                html: emailTemplate(userCheck.nome, otp.toString())
            });
    
            const abc = await Otp.create({
                otp,
                expiresAfter: Date.now(),
                tempLink: crypto.randomUUID(),
                userId: userCheck._id
            })


            return res.status(401).json({tempLink: abc.tempLink})
        }

        if (compareSync(password, userCheck.senha)) {
            const token = jwt.sign({ id: userCheck._id }, loadEnvironmentVariable("TOKEN_SECRET"), { expiresIn: "7d" });

            const { email, id, nome } = userCheck;
            return res.json({
                user: {
                    email,
                    id,
                    nome
                }
                , token
            });
        } else {
            return res.status(400).json({ message: "Email ou senha incorreto." });
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}