const { createTask, getTaskList, getTaskById } = require('../repositories/task.repo');

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

module.exports = {
    createTaskService,
    TaskListService,
    getTaskByIdService
};