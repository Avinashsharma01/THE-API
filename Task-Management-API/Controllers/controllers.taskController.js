import Task from '../Models/models.Task.js';

export const createTask = async (req, res) => {
    const { title, description, priority, deadline, assignedTo } = req.body;
    const task = new Task({ title, description, priority, deadline, assignedTo, createdBy: req.user.id });
    await task.save();
    res.json(task);
};

export const getTasks = async (req, res) => {
    const tasks = await Task.find().populate('assignedTo');
    res.json(tasks);
};

export const updateTask = async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
};
