const express = require("express");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");
const {
    createTaskController,
    taskListController,
    getTaskByIdController
} =  require("../controllers/taskController");

const router = express.Router();

router.post("/create", authenticationMiddleware, createTaskController);

router.post("/list", authenticationMiddleware, taskListController);

router.get("/get/:taskId/:userId", authenticationMiddleware, getTaskByIdController);

module.exports = router;