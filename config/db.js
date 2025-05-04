import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/flowtask")
        console.log("Mongoose connected")
        return conn.connection
    } catch (err) {
        console.log("Database have error: ", err)
        process.exit(1)
    }
}

export default connectDB