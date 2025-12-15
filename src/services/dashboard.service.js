const {
    getAllDashboardMetricsDataRepo
} 
= require("../repositories/dashboard.repo");


// all dashboard metrics in single
const getAllDashboardMetricsDataService = async (userId) => {
    const data = await getAllDashboardMetricsDataRepo(userId);

    return data;
};

module.exports = {
    getAllDashboardMetricsDataService
}