const express = require('express');
const cors = require("cors");
const {
    runMigrations
} = require("./src/migrations/DBUpdater.js");

const userRoutes = require("./src/routes/user.routes.js");
const taskRoutes = require("./src/routes/task.routes.js");
const dashboardRoutes = require("./src/routes/dashboard.routes.js");

const MIGRATION_ON = false;

const app = express();

if(MIGRATION_ON){
    // Migrate DB
    runMigrations();
}

const corsOptions = {
    origin: 'http://localhost:5173',       // exact frontend origin
    credentials: true,                     // allow cookies/credentials
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization','X-Requested-With', 'x-auth-token'],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// Ensure OPTIONS preflight is handled
app.options(/.*/, cors(corsOptions));

app.use(express.json());

// User related routes
app.use("/api/v1/user", userRoutes);

// Task related routes
app.use("/api/v1/task", taskRoutes);

// dashboard relateed routes
app.use('/api/v1/dashboard', dashboardRoutes);

// Test route
app.use("/test", (req, res) => {
    res.status(200).json({ message: "Hello from test!" });
});

module.exports = app;
