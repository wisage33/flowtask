import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    createdAt: { type: Date, default: Date.now}
})

export default mongoose.models.User || mongoose.model('User', userSchema)