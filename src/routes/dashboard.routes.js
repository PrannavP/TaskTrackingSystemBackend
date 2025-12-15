const express = require('express');
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");
const {
    getDashboardMetricsController
} = require("../controllers/dashboardController");

const router = express.Router();

router.get('/getDashboardMetrics/:userId', authenticationMiddleware, getDashboardMetricsController);

module.exports = router;