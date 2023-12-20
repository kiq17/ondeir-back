import Comments from "../models/Comments";

export const getCommentsService = async (placeId: string) => {
    const comments = await Comments.find({
        placeId
    }).populate("userId", ["nome", "avatar", "estado"])

    return comments;
};