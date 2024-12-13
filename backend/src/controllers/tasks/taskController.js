import Task from "../../models/tasks/taskModel.js";

const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status, priority } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }

        const existingTask = await Task.findOne({ title, user: req.user._id });
        if (existingTask) {
            return res.status(400).json({ message: "Task with this title already exists" });
        }

        const newTask = new Task({
            title,
            description,
            dueDate,
            status,
            priority,
            user: req.user._id,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });
        return res.status(200).json({ length: tasks.length, tasks});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const taskId = req.params.id;
        if (!taskId) {
            return res.status(404).json({ message: "Please provide an id for the task." });
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        if(!task.user.equals(userId)) {
            return res.status(401).json({ message: "You are not authorized to view this task." });
        }

        return res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const { title, description, dueDate, status, completed, priority } = req.body;

        if (!id) {
            return res.status(404).json({ message: "Please provide an id for the task." });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        if(!task.user.equals(userId)) {
            return res.status(401).json({ message: "You are not authorized to update this task." });
        }

        const existWithSameTitle = await Task.findOne({title: title});
        if(existWithSameTitle && !existWithSameTitle._id.equals(id)) {
            return res.status(400).json({ message: "Task with this title already exists" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;
        task.completed = completed || task.completed;
        task.priority = priority || task.priority;

        await task.save();
        return res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user._id;

        if (!id) {
            return res.status(404).json({ message: "Please provide an id for the task." });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        if(!task.user.equals(userId)) {
            return res.status(401).json({ message: "You are not authorized to delete this task." });
        }

        await Task.findByIdAndDelete(id);
        return res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export { createTask, getTasks, getTask, updateTask, deleteTask };