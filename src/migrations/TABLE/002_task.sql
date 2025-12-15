CREATE TABLE IF NOT EXISTS task (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    task_name VARCHAR(200) NOT NULL,
    task_number INT[],
    bug_number INT[],
    type VARCHAR[] NOT NULL, -- task or bug
    branch_name VARCHAR[] NOT NULL,
    changes_type VARCHAR[] NOT NULL, -- UI / API / DB
    is_merged BOOLEAN DEFAULT FALSE,
    merged_date DATE,
    description TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_date DATE,
    created_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
