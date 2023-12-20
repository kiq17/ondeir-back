import Users from "../models/Users"



export const editUserAvatarService = async (avatar: string, userId: string)=>{
    const editedUser = await Users.findByIdAndUpdate(userId, {
        avatar,
    });

    return editedUser
}