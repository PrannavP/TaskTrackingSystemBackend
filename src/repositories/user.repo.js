const pool = require('../config/dbConfig');

// User Registration
const createUser = async (user) => {
    const query = `
        INSERT INTO users (full_name, email, password, date_of_birth, bio, created_date, updated_date)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        RETURNING *;
    `;

    const values = [user.full_name, user.email, user.password, user.date_of_birth, user.bio];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Find user by email
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail
};