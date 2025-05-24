import mongoose, { mongo, Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['new', 'inWork', 'completed'],
        default: 'new'
    },
    createdAt: {type: Date, default: Date.now},
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
})

export default mongoose.models.Task || mongoose.model("Task", taskSchema)