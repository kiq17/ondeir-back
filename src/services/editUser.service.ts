import Users from "../models/Users"



export const editUserService = async (nome: string, descricao: string, userId: string) => {
    const editedUser = await Users.findByIdAndUpdate(userId, {
        $set:{
            descricao,
            nome
        }
    });

    return editedUser
}