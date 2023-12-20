import mongoose from "mongoose";
import Places from "../models/Places"
import { IStars, mathReview } from "../utils/mathReview";

interface T extends mongoose.Document {
    _doc: any

    titulo: string;
    descricao: string;
    tags: string[];
    imageFile: string[];
    avaliacoes: number;
    avaliadores: mongoose.Types.ObjectId[];
    criadoPor?: mongoose.Types.ObjectId | undefined;
    estrelas?: IStars | undefined;
}

export const getAllPlacesService = async (page: number, limit: number, order: "recente" | "melhor") => {

    const places = await Places.find<T>({
    }).populate("criadoPor", ["nome"])

    const p = places.map((item) => {
        if (item.estrelas) {
            return { ...item._doc, estrelas: mathReview(item.estrelas) }
        }

    }).sort((a, b) => {
        if (order == "melhor") {
            return b.estrelas.media - a.estrelas.media
        } else {
            const dA = new Date(a.createdAt);
            const dB = new Date(b.createdAt);

            return dB.getTime() - dA.getTime()
        }
    }).slice((page - 1) * limit, page * limit)

    return p;
}