// this checks if the token provided in request header is valid or not
const jwt = require('jsonwebtoken');
const { verifyJWTToken } = require("../helpers/authTokenHelper");

const authenticationMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // check if no token
    if(!token){
        return res.status(401).json({ message: "No auth token provided." });
    }

    try{
        // Verify token
        const decoded = verifyJWTToken(token);

        // Add user from payload
        req.user = decoded;

        next();
    }catch(err){
        res.status(401).json({ message: "Token is not valid." });
    }
};