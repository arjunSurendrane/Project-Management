import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    ClientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    name: String,
    description: String,
    status: { type: String, enum: ['ToDo', 'In Progress', 'Completed'] }
})

const Project = mongoose.model('Project', ProjectSchema)
export default Project