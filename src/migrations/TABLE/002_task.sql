CREATE TABLE IF NOT EXISTS task (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(200) NOT NULL,
    task_number VARCHAR(200),
    bug_number VARCHAR(200),
    type VARCHAR(10), -- task or bug
    branch_name VARCHAR(100) NOT NULL,
    changes_type VARCHAR(20) NOT NULL, -- UI / API / DB
    is_merged BOOLEAN DEFAULT FALSE,
    merged_date DATE,
    bio TEXT,
    created_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
