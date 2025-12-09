const express = require("express");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");
const {
    createTaskController
} =  require("../controllers/taskController");

const router = express.Router();

router.post("/create", authenticationMiddleware, createTaskController);

module.exports = router;