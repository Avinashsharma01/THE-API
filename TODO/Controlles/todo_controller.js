import Todo from "../Models/Todo_model.js"

const displayTODO = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const createTODO = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const newTodo = new Todo({ title });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateTODO = async (req, res) => {
    const { title, completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, completed },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



const deleteTODO = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export { displayTODO, createTODO, updateTODO, deleteTODO };