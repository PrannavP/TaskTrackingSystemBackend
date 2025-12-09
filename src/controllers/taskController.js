const {
    createTaskService
} = require("../services/task.service");

const createTaskController = async (req, res, next) => {
    try{
        const task = await createTaskService(req.body);
        res.status(201).json({ success: true, message: "Task created successfully.", data: task });
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports = {
    createTaskController
};