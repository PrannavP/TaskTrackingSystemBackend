const { createUser, findUserByEmail, loginUser } = require("../repositories/user.repo");
const bcrypt = require("bcryptjs");
const { generateJWTToken } = require("../helpers/authTokenHelper");

const registerUserService = async (data) => {
    const existing = await findUserByEmail(data.email);

    if(existing) throw new Error("Email already registered.");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userToCreate = { ...data, password: hashedPassword };

    return await createUser(userToCreate);
};

// login user
const loginUserService = async (data) => {
    const existing = await loginUser(data);

    if(!existing) throw new Error(`User with email ${data.email} does not exists.`);

    // compare passwords
    const comparePassword = await bcrypt.compare(data.password, existing.password);

    if(!comparePassword) throw new Error("Invalid credentials.");

    // generate jwt token
    const token = generateJWTToken(existing.id);

    return token;
};

module.exports = {
    registerUserService,
    loginUserService
};