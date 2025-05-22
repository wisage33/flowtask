import Task from "../models/Task.js";

const taskController = {
    assignTaskToUser: async(req, res) => {
        try {
            const { userId, ...userData } = req.user
            const {id: taskId } = req.params

            const updatedTask = await Task.findByIdAndUpdate(
                taskId, 
                {
                    status: 'inWork',
                    assignedTo: userId
                },
                { new: true}
            )

            if(!updatedTask) {
                return res.status(400).json({ error: 'Task is not find'})
            }

            res.json(updatedTask)
        } catch (err) {
            res.json({ error: err.message })
        }
    },

    getAll: async (req, res) => {
        try {
            const tasks = await Task.find().sort({ createdAt: -1});
            res.json(tasks);
        } catch (err) {
            handleError(res, err);
        }
    },
    
    create: async (req, res) => {
        try {
            const task = await Task.create({
                title: req.body.title,
                description: req.body.description
            });
            res.status(201).json(task);
        } catch (err) {
            handleError(res, err);
        }
    },

    delete: async(req, res) => {
        try {
            console.log(req.params)
            const deletetask = await Task.findByIdAndDelete(req.params.id) 
            if(!deletetask) {
                return res.status(404).json({"error": "task not found"})
            }
            res.json({"message": "Task delete"})
        } catch (err) {
            handleError(res, err)
        }
    }
};

function handleError(res, err) {
    console.error(err);
    res.status(500).json({ 
        error: err.message || 'Server error' 
    });
}

export default taskController;