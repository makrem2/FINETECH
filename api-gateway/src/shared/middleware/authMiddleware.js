const jwt = require("jsonwebtoken");
const axios = require("axios");
const AUTH_SERVICE_URL = "http://localhost:3001/auth";
const config = require("../utils/auth.config");

// Middleware to verify token
const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"] || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }
  // Handle 'Bearer <token>' format
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }
  try {
    // Verify token signature
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;

    // Check if token is blacklisted by querying auth-service
    const response = await axios.get(
      `${AUTH_SERVICE_URL}/tokenBlacklist/${token}`
    );
    console.log(response.data.isBlacklisted);
    if (response.data.isBlacklisted) {
      return res
        .status(403)
        .json({ message: "Token expired! Please login again!" });
    }
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check multiple roles (admin/user)
const hasRole = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Role extracted from token
    console.log(`User Role: ${userRole}`); // Debugging

    if (roles.includes(userRole)) {
      return next(); // Role matches one of the allowed roles
    }

    return res.status(403).send({
      message: `Access denied. Requires one of the following roles: ${roles.join(
        ", "
      )}`,
    });
  };
};

// Define specific role check middleware
const isAdmin = hasRole("admin");
const isUser = hasRole("user");
const isAdminOrUser = hasRole("admin", "user"); // New combined middleware

module.exports = { verifyToken, isAdmin, isUser, isAdminOrUser };
