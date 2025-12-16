const {
    createTaskService,
    TaskListService,
    getTaskByIdService,
    updateTaskService
} = require("../services/task.service");

const createTaskController = async (req, res, next) => {
    try{
        await createTaskService(req.body);
        res.status(201).json({ success: true, message: "Task created successfully." });
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
};

const taskListController = async(req, res) => {
    try{
        const data = await TaskListService(req.body);
        res.status(200).json({ success: true, data: data });
    }catch(error){
        res.status(400).json({ success: false, message: error.message })
    }
};

const getTaskByIdController = async(req, res) => {
    try{
        const task_id = req.params.taskId;
        const user_id = req.params.userId;

        const taskData = await getTaskByIdService(task_id, user_id);

        if(!taskData){
            res.status(404).json({ success: false, message: 'Task does not exists.' });
        }

        res.status(200).json({ success: true, data: taskData });
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
};

const updateTaskController = async (req, res) => {
    try{
        const updatedTaskData = await updateTaskService(req.body);

        if(!updatedTaskData){
            res.status(404).json({ success: false, message: "Task does not exists." });
        };

        res.status(201).json({ success: true, message: "Task updated successfully.", data: updatedTaskData });
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports = {
    createTaskController,
    taskListController,
    getTaskByIdController,
    updateTaskController
};