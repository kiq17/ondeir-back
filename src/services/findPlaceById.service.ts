import Places from "../models/Places";


export const findPlaceByUserId = async(userId: string)=>{
    let findByUser = await Places.find({
        criadoPor: userId
    });

    return findByUser;
};