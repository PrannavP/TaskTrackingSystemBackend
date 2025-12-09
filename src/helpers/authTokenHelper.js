const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRATION_TIME = 2 * 24 * 60 * 60;


// Generate jwt token
const generateJWTToken = (userUUID) => {
    return jwt.sign({ id: userUUID }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
};

// Verify jwt token
const verifyJWTToken = (token) => {
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }catch(err){
        throw new Error("Invalid JWT Token.");
    }
};

module.exports = {
    generateJWTToken,
    verifyJWTToken
};