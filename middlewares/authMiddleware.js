const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "8h";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Use your JWT secret key
    req.user = decoded; // Attach user information to the request
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
