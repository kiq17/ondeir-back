import { Types } from "mongoose";
import Places from "../models/Places";


export const reviewStarsService = async (star: number, placeId: string, userId: Types.ObjectId) => {

    const stars = await Places.findById(placeId)

    switch (star) {
        case 5:
            if (stars?.avaliadores.some(item => item.info?.id?.equals(userId))) {
                const findedRate = stars?.avaliadores.find(item => item.info?.id?.equals(userId));
                const starNumber = findedRate?.info?.action
                if (starNumber) {
                    await Places.findByIdAndUpdate(placeId, {
                        $inc: {
                            [`estrelas.${starNumber}`]: -1,
                            avaliacoes: -1
                        },
                        $pull: {
                            avaliadores: { info: { id: userId, action: `${starNumber}` } }
                        }
                    });
                }
            }
            await Places.findByIdAndUpdate(placeId, { $inc: { "estrelas.cinco": 1, avaliacoes: 1 }, $addToSet: { avaliadores: { info: { id: userId, action: "cinco" } } } });
            break;
        case 4:
            if (stars?.avaliadores.some(item => item.info?.id?.equals(userId))) {
                const findedRate = stars?.avaliadores.find(item => item.info?.id?.equals(userId));
                const starNumber = findedRate?.info?.action
                if (starNumber) {
                    await Places.findByIdAndUpdate(placeId, {
                        $inc: {
                            [`estrelas.${starNumber}`]: -1,
                            avaliacoes: -1
                        },
                        $pull: {
                            avaliadores: { info: { id: userId, action: `${starNumber}` } }
                        }
                    });
                }
            }
            await Places.findByIdAndUpdate(placeId, { $inc: { "estrelas.quatro": 1, avaliacoes: 1 }, $addToSet: { avaliadores: { info: { id: userId, action: "quatro" } } } })
            break;
        case 3:
            if (stars?.avaliadores.some(item => item.info?.id?.equals(userId))) {
                const findedRate = stars?.avaliadores.find(item => item.info?.id?.equals(userId));
                const starNumber = findedRate?.info?.action
                if (starNumber) {
                    await Places.findByIdAndUpdate(placeId, {
                        $inc: {
                            [`estrelas.${starNumber}`]: -1,
                            avaliacoes: -1
                        },
                        $pull: {
                            avaliadores: { info: { id: userId, action: `${starNumber}` } }
                        }
                    });
                }
            }
            await Places.findByIdAndUpdate(placeId, { $inc: { "estrelas.três": 1, avaliacoes: 1 }, $addToSet: { avaliadores: { info: { id: userId, action: "três" } } } })
            break;
        case 2:
            if (stars?.avaliadores.some(item => item.info?.id?.equals(userId))) {
                const findedRate = stars?.avaliadores.find(item => item.info?.id?.equals(userId));
                const starNumber = findedRate?.info?.action
                if (starNumber) {
                    await Places.findByIdAndUpdate(placeId, {
                        $inc: {
                            [`estrelas.${starNumber}`]: -1,
                            avaliacoes: -1
                        },
                        $pull: {
                            avaliadores: { info: { id: userId, action: `${starNumber}` } }
                        }
                    });
                }
            }
            await Places.findByIdAndUpdate(placeId, { $inc: { "estrelas.dois": 1, avaliacoes: 1 }, $addToSet: { avaliadores: { info: { id: userId, action: "dois" } } } })
            break;
        case 1:
            if (stars?.avaliadores.some(item => item.info?.id?.equals(userId))) {
                const findedRate = stars?.avaliadores.find(item => item.info?.id?.equals(userId));
                const starNumber = findedRate?.info?.action
                if (starNumber) {
                    await Places.findByIdAndUpdate(placeId, {
                        $inc: {
                            [`estrelas.${starNumber}`]: -1,
                            avaliacoes: -1
                        },
                        $pull: {
                            avaliadores: { info: { id: userId, action: `${starNumber}` } }
                        }
                    });
                }
            }
            await Places.findByIdAndUpdate(placeId, { $inc: { "estrelas.um": 1, avaliacoes: 1 }, $addToSet: { avaliadores: { info: { id: userId, action: "um" } } } })
            break;
        default:
            break;
    }

}