import mongoose, { mongo, Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: {type: Date, default: Date.now}
})

export default mongoose.models.Task || mongoose.model("Task", taskSchema)