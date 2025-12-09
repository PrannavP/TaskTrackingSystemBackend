const pool = require('../config/dbConfig');

// Create task
const createTask = async (task) => {
    const query = `
        INSERT INTO task (task_name, task_number, bug_number, type, branch_name, changes_type, description, user_id, created_date, updated_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING *;
    `;

    const values = [task.task_name, task.task_number, task.bug_number, task.type, task.branch_name, task.changes_type, task.description, task.user_id];

    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    createTask
};