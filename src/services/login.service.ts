import Users from "../models/Users";


export const loginService = async (email: string) => {
    const user = await Users.findOne({ email });

    if (!user) {
        throw new Error("Email ou senha incorreto.");
    }

    return user;
}