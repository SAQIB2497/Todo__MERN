import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // Check if token exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract token
    const token = authHeader.split(" ")[1]; 

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = { _id: decoded.id };

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error });
  }
};

export default authMiddleware;
