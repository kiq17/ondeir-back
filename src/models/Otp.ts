import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    expiresAfter: {
        type: Date,
    },
    tempLink: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
}, { timestamps: true })

export default mongoose.model("Otps", otpSchema);