const { createTask } = require('../repositories/task.repo');

const createTaskService = async(data) => {
    const taskCreated = await createTask(data);

    return taskCreated;
};

module.exports = {
    createTaskService
};