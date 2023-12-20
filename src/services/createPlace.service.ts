import { PlaceBody } from "../controllers/place/createPlace.controller"
import Places from "../models/Places"

interface CreatePlace extends PlaceBody{
    userId: string
}

export const createPlaceService = async ({ titulo, descricao, tags, imageFile, userId }: CreatePlace)=>{

    let placeCreated = await Places.create({
        titulo,
        descricao,
        tags,
        imageFile,
        criadoPor: userId,
    });
    
    return placeCreated;
}