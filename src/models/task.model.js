// user model of db (schema)
export const UserModel = {
    table: "user",
    columns: ["id", "task_name", "branch_name", "changes_type", "is_merged", "created_date", "updated_date", "merged_date", "task_number", "bug_number", "type"] // type means bug or task
};