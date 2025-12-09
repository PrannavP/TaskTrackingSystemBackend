const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
require("dotenv").config();

async function runSqlFile(client, filePath) {
    const sql = fs.readFileSync(filePath, "utf-8");
    try {
        await client.query(sql);
        console.log(`✅ Ran: ${filePath}`);
    } catch (err) {
        console.error(`❌ Error in ${filePath}:`, err.message);
    }
}

async function runMigrations() {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    await client.connect();

    const migrationFolders = ["TABLE", "ALTER"];

    for (const folder of migrationFolders) {
        const dirPath = path.join(__dirname, folder);
        const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".sql"));
        files.sort();

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            await runSqlFile(client, filePath);
        }
    }

    await client.end();
    console.log("✅ All migrations done!");
}

module.exports = { runMigrations };