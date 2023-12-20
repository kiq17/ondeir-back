// import { hashSync } from "bcryptjs";
// import { BodyUser } from "../controllers/user/createUser.controller";
// import Users from "../models/Users";


// export const createUserService = async () => {
//     const emailCheck = await Users.findOne({ email });

//     if (emailCheck) {
//         throw new Error("Email já existente");
//     }

//     let userCreated = await Users.create({ nome, senha: hashSync(senha), email, estado, tempLink });

//     return userCreated;
// }