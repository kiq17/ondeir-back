import * as createComment from "./createComment.controller";
import * as getComments from "./getComments.controller";
import * as toggleLike from "./toggleLike.controller";

export const commentController = {
    ...createComment,
    ...getComments,
    ...toggleLike
};