import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        unique: true,
        trim: true,
        maxLength: [100, 'Task title should not exceed 100 characters']
    },

    description: {
        type: String,
        default: 'No description'
    },

    dueDate: {
        type: Date,
        default: Date.now()
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    completed: {
        type: Boolean,
        default: false
    },

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },


}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;