const { registerUserService, loginUserService } = require("../services/user.service");

const createUserController = async (req, res) => {
    try{
        const user = await registerUserService(req.body);
        res.status(201).json({ success: true, message: "User created successfully.", data: user });
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
};

const loginUserController = async (req, res) => {
    try{
        const token = await loginUserService(req.body);
        res.status(200).json({ success: true, message: "Logged in successfully.", data: token });
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports = {
    createUserController,
    loginUserController
};