const jwt = require('jsonwebtoken');
const db = require('../config/db');

/**
 * Middleware function to authenticate requests using JSON Web Tokens (JWT).
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function in the stack.
 */
const authMiddleware = (req, res, next) => {
  // Extract the token from the request headers
  const token = req.headers['authorization'];
  
  // Check if token is present
  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user information to the request object
    req.user = decoded;
    // Call the next middleware function in the stack
    next();
  } catch (err) {
    // Return error if token is invalid
    res.status(400).send('Invalid token');
  }
};

// Export the authentication middleware for use in other parts of the application
module.exports = authMiddleware;
