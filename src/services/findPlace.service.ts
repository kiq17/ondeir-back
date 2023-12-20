import { isValidObjectId } from "mongoose";
import Places from "../models/Places";

export const findPlace = async (placeId: string) => {

    if(isValidObjectId(placeId)){
        const findedPlace = await Places.findById(placeId).populate("criadoPor", ["nome"]);
        return findedPlace;
    } else{
        throw("Error id")
    }
    
};