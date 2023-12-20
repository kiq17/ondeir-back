import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    texto: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Places"
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    avaliadores: [
        {
            info: {
                id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
                action: { type: String }
            }
        }
    ]
}, { timestamps: true });

export default mongoose.model("Commens", commentsSchema);