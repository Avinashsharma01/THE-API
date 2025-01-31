import mongoose from 'mongoose';

const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        },
        deadline: Date,
        assignedTo: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        createdBy: {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    },
    { timestamps: true }
);


const Task = mongoose.model('Task', TaskSchema)
export default Task
