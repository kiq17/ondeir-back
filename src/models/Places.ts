import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    tags: [
        { type: String }
    ],
    imageFile: [
        { type: String }
    ],
    criadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    estrelas: {
        cinco: { type: Number, default: 0 },
        quatro: { type: Number, default: 0 },
        três: { type: Number, default: 0 },
        dois: { type: Number, default: 0 },
        um: { type: Number, default: 0 }
    },
    avaliacoes: {
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


export default mongoose.model("Places", placeSchema);