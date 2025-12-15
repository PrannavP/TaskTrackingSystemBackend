// dashboard metrics
const pool = require("../config/dbConfig");

const getAllDashboardMetricsDataRepo = async (user_id) => {
    const result = await pool.query(
        `
        SELECT
            -- completed tasks this month
            COUNT(*) FILTER (
                WHERE 'task' = ANY(type)
                  AND completed_date >= date_trunc('month', CURRENT_DATE)
                  AND completed_date <  date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
            ) AS tasks_completed_this_month,

            -- not merged (task + bug)
            COUNT(*) FILTER (
                WHERE is_merged = FALSE
            ) AS not_merged_count,

            -- total completed bugs
            COUNT(*) FILTER (
                WHERE is_completed = TRUE
                  AND 'bug' = ANY(type)
            ) AS completed_bug_count,

            -- total completed tasks
            COUNT(*) FILTER (
                WHERE is_completed = TRUE
                  AND 'task' = ANY(type)
            ) AS completed_task_count,

            -- in-progress (not completed)
            COUNT(*) FILTER (
                WHERE is_completed = FALSE
            ) AS in_progress_count

        FROM task
        WHERE user_id = $1
        `,
        [user_id]
    );

    const row = result.rows[0];

    return {
        tasksCompletedThisMonth: Number(row.tasks_completed_this_month),
        notMergedCount: Number(row.not_merged_count),
        completedBugCount: Number(row.completed_bug_count),
        completedTaskCount: Number(row.completed_task_count),
        inProgressCount: Number(row.in_progress_count)
    };
};

module.exports = {
    getAllDashboardMetricsDataRepo
};