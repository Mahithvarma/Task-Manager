import Task from "../../models/tasks/taskModel.js";

const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status, priority } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Title is required" });
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
        res.status(500).json(error.message);
    }
}

export { createTask };