import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: "e"
    },
    descricao: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model("Users", userSchema);