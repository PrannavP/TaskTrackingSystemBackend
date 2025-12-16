const { createTask, getTaskList, getTaskById, updateTaskById } = require('../repositories/task.repo');

const createTaskService = async(data) => {
    const taskCreated = await createTask(data);

    return taskCreated;
};

const TaskListService = async(data) => {
    const taskList = await getTaskList(data);

    return taskList;
}

const getTaskByIdService = async (task_id, user_id) => {
    const taskData = await getTaskById(task_id, user_id);

    return taskData;
};

// update task
const updateTaskService = async (task) => {
    const updatedTask = await updateTaskById(task);

    return updatedTask;
};

module.exports = {
    createTaskService,
    TaskListService,
    getTaskByIdService,
    updateTaskService
};