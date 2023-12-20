import { hashSync } from "bcryptjs";
import Users from "../models/Users"



export const newPasswordService = async (senha: string, userId: string) => {
    const editedUser = await Users.findByIdAndUpdate(userId, {
        $set:{
            senha: hashSync(senha)
        }
    });

    return editedUser
}