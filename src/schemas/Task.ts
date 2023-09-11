import mongoose from "mongoose";

const Task = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    emailUser: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Task", Task);