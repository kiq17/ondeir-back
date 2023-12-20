import Users from "../models/Users"


export const findUserById = async (id: string) => {
    const user = await Users.findById(id);

    if(!user){
        throw new Error("Usuário não encontrado");
    }

    return user;
}