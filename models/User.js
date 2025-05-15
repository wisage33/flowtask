import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    telegramId: {type: Number, required: true, unique: true},
    firstName: String,
    lastName: String,
    username: String,
    photoUrl: String,
    role: {type: String, default: 'user'},
    createdAt: {type: Date, default: Date.now}
})

export default mongoose.models.User || mongoose.model('User', userSchema)