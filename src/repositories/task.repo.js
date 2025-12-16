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

// Task List (dynamic filters)
const getTaskList = async (filters) => {
    let sql = `
        SELECT
            id,
            task_name,
            task_number,
            bug_number,
            type,
            is_merged,
            is_completed
        FROM task
        WHERE user_id = $1
    `;

    const values = [filters.user_id];
    let idx = 2;

    if (filters.type) {
        sql += ` AND $${idx} = ANY(type)`;
        values.push(filters.type);
        idx++;
    }

    if (filters.bug_number) {
        sql += ` AND $${idx} = ANY(bug_number)`;
        values.push(filters.bug_number);
        idx++;
    }

    if (filters.is_merged !== undefined) {
        sql += ` AND is_merged = $${idx}`;
        values.push(filters.is_merged);
        idx++;
    }

    if (filters.is_completed !== undefined) {
        sql += ` AND is_completed = $${idx}`;
        values.push(filters.is_completed);
        idx++;
    }

    if (filters.task_name) {
        sql += ` AND task_name ILIKE $${idx}`;
        values.push(`%${filters.task_name}%`);
        idx++;
    }

    sql += ` ORDER BY created_date DESC`;

    const result = await pool.query(sql, values);
    return result.rows;
};

// Get task by id
const getTaskById = async(task_id, user_id) => {
    const result = await pool.query(
        `
        SELECT * FROM task WHERE id = $1 AND user_id = $2
        `, [task_id, user_id]
    );

    return result.rows[0];
};

// Update task
const updateTaskById = async (task) => {
    const result = await pool.query(
        `
        UPDATE task
        SET task_name = $1, task_number = $2, bug_number = $3, type = $4, branch_name = $5,
            changes_type = $6, description = $7, updated_date = NOW(), is_merged = $8, merged_date = $9, is_completed = $10, completed_date = $11
        WHERE id = $12 RETURNING *;
        `, [task.task_name, task.task_number, task.bug_number, task.type, task.branch_name, task.changes_type, task.description, task.is_merged, task.merged_date, task.is_completed, task.completed_date, task.task_id]
    );

    console.log(result);

    return result.rows[0];
};

module.exports = {
    createTask,
    getTaskList,
    getTaskById,
    updateTaskById
};