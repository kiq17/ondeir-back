import { CommentBody } from "../controllers/comment/createComment.controller";
import Comments from "../models/Comments";

interface CerateComment extends CommentBody {
    placeId: string;
    userId: string;
}

export const createCommentService = async ({
    placeId,
    texto,
    userId
}: CerateComment)=>{

    const comment = await Comments.create({ texto, userId, placeId });

    return comment;
}