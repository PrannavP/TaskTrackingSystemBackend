const { createUser, findUserByEmail } = require("../repositories/user.repo");
const bcrypt = require("bcryptjs");

const registerUserService = async (data) => {
    const existing = await findUserByEmail(data.email);

    if(existing) throw new Error("Email already registered.");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await createUser(data);
};

module.exports = {
    registerUserService
};