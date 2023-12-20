import { hashSync } from "bcryptjs";
import { BodyUser } from "../controllers/user/createUser.controller";
import Users from "../models/Users";
import mongoose from "mongoose";

export interface UT extends mongoose.Document {
    _doc: any

    createdAt: Date;
    updatedAt: Date;
    nome: string;
    email: string;
    senha: string;
    estado: string;
    admin: boolean;
    avatar: string;
    isActive: boolean;
    descricao?: string | undefined;
}

export const createUserService = async ({ nome, senha, email, estado }: BodyUser) => {
    const emailCheck = await Users.findOne<UT>({ email });

    if (emailCheck) {
        throw new Error("Email já existente");
    }

    let userCreated = await Users.create({ nome, senha: hashSync(senha), email, estado });

    return userCreated;
}