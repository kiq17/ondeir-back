import { Types } from "mongoose";
import Comments from "../models/Comments";

export const toggleLikeService = async (userId: Types.ObjectId, commentId: Types.ObjectId, action: string) => {

    const comments = await Comments.findById(commentId);


    const isUserLiked = comments?.avaliadores.some(item => {
        if (item) {
            if (item.info) {
                return item.info.id?.equals(userId)
            }
        }
    });

    if (!isUserLiked) {
        if (action == "like") {
            await Comments.findByIdAndUpdate(commentId, {
                $inc: {
                    likes: 1
                },
                $addToSet: {
                    avaliadores: { info: { id: userId, action: "like" } }
                }
            })

        } else {

            await Comments.findByIdAndUpdate(commentId, {
                $inc: {
                    dislikes: 1
                },
                $addToSet: {
                    avaliadores: { info: { id: userId, action: "dislike" } }
                }
            })
        }
    } else {
        if (action == "like") {
            const isUserAlreadyLike = comments?.avaliadores.some(item => item.info?.id?.equals(userId) && item.info?.action == "like");
            if (!isUserAlreadyLike) {
                await Comments.findByIdAndUpdate(commentId, {
                    $inc: {
                        likes: 1,
                        dislikes: -1
                    },
                    $pull: {
                        avaliadores: { info: { id: userId, action: "dislike" } }
                    },
                });
                await Comments.findByIdAndUpdate(commentId, {
                    $addToSet: {
                        avaliadores: { info: { id: userId, action: "like" } }
                    }
                });
            } else{
                await Comments.findByIdAndUpdate(commentId, {
                    $inc: {
                        likes: -1,
                    },
                    $pull: {
                        avaliadores: { info: { id: userId, action: "like" } }
                    },
                });
            }

            
        } else {
            const isUserAlreadyDislike = comments?.avaliadores.some(item => item.info?.id?.equals(userId) && item.info?.action == "dislike");
            if (!isUserAlreadyDislike) {
                await Comments.findByIdAndUpdate(commentId, {
                    $inc: {
                        likes: -1,
                        dislikes: 1
                    },
                    $pull: {
                        avaliadores: { info: { id: userId, action: "like" } }
                    },
                });
                await Comments.findByIdAndUpdate(commentId, {
                    $addToSet: {
                        avaliadores: { info: { id: userId, action: "dislike" } }
                    }
                });
            }  else{
                await Comments.findByIdAndUpdate(commentId, {
                    $inc: {
                        dislikes: -1,
                    },
                    $pull: {
                        avaliadores: { info: { id: userId, action: "dislike" } }
                    },
                });
            }
        }
    }

    return { message: "sucesso" }
}