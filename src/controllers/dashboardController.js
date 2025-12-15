const { getAllDashboardMetricsDataService } = require("../services/dashboard.service");

const getDashboardMetricsController = async (req, res) => {
    try{
        const user_id = req.params.userId;

        const data = await getAllDashboardMetricsDataService(user_id);

        setTimeout(() => {
            res.status(201).json({ success: true, data: data });
        }, 5000);
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports = {
    getDashboardMetricsController
};