import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide username"],
    },
    isVerfied:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})
const User = mongoose.model.users || mongoose.model("users", userSchema)
mongoose.models = {}

export default User;