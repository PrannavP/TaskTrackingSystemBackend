const express = require('express');
const cors = require("cors");
const {
    runMigrations
} = require("./src/migrations/DBUpdater.js");
const userRoutes = require("./src/routes/user.routes.js");

const app = express();

// Migrate DB
runMigrations();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", userRoutes);

// Test route
app.use("/test", (req, res) => {
    res.status(200).json({ message: "Hello from test!" });
});

module.exports = app;
