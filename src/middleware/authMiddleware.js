const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { getUsernameFromToken } = require("../utils/jwtUtils");
const { isTokenBlacklisted } = require("./blacklistMiddleware");
const { checkActiveSession } = require("../services/authService");

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: "Session not found" });
  }
  const activeSession = await checkActiveSession(getUsernameFromToken(token));

  if (activeSession === null || activeSession !== token) {
    return res.status(401).json({ message: "Session not found" });
  }

  const existingUser = await User.findUserByUsername(
    getUsernameFromToken(token) || ""
  );

  if (!existingUser) {
    return res.status(401).json({ message: "Invalid user" });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Call the next middleware
    next();
  });
};

const checkUserRole = (role) => {
  return (req, res, next) => {
    const { user } = req;
    if (user && user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Access forbidden" });
    }
  };
};

module.exports = { verifyToken, checkUserRole };
