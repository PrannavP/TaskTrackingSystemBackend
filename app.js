const express = require('express');
const cors = require("cors");
const {
    runMigrations
} = require("./src/migrations/DBUpdater.js");
const userRoutes = require("./src/routes/user.routes.js");
const taskRoutes = require("./src/routes/task.routes.js");

const MIGRATION_ON = false;

const app = express();

if(MIGRATION_ON){
    // Migrate DB
    runMigrations();
}

// Middlewares
app.use(cors());
app.use(express.json());

// User related routes
app.use("/api/v1/user", userRoutes);

// Task related routes
app.use("/api/v1/task", taskRoutes);

// Test route
app.use("/test", (req, res) => {
    res.status(200).json({ message: "Hello from test!" });
});

module.exports = app;
