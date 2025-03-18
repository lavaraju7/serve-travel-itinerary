const jwt = require("jsonwebtoken");

class AuthMiddleware {
  constructor(secretKey, excludedRoutes = ["/login", "/signup"]) {
    this.secretKey = secretKey || "default_secret";
    this.excludedRoutes = excludedRoutes;
  }

  verifyToken(req, res, next) {
    // Skip authentication for excluded routes
    if (this.excludedRoutes.includes(req.path)) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    try {
      const decoded = jwt.verify(token, this.secretKey);
      req.user = decoded; // Attach user data to request object
      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  }
}

// Create an instance of the class
const authMiddleware = new AuthMiddleware(process.env.JWT_SECRET);

// Export ONLY the middleware function, properly bound
module.exports = authMiddleware.verifyToken.bind(authMiddleware);
