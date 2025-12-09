const app = require("./app");
const dotenv = require("dotenv");

// load .env file
dotenv.config();

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});