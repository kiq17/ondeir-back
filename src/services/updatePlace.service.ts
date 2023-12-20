import { PlaceBody } from "../controllers/place/createPlace.controller"
import Places from "../models/Places"
import { findPlace } from "./findPlace.service"


export const updatePlaceService = async(
    placeId: string,
    {
        titulo,
        descricao,
        imageFile,
        tags
    }: PlaceBody
    )=>{
    
    const place = await findPlace(placeId)

    if(!place) throw("Lugar não encontrado")

    let placeEdit = await Places.findByIdAndUpdate(placeId, {
        titulo: titulo ? titulo : place.titulo,
        descricao: descricao ? descricao : place.descricao,
        tags: tags ? tags : place.tags,
        imageFile: imageFile ? imageFile : place.imageFile,
    })

    return placeEdit
}