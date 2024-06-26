const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserQuery, [username], async (err, results) => {
    if (err) {
      console.error('Error checking username:', err);
      return res.status(500).send('Server error');
    }

    // If username already exists, return error
    if (results.length > 0) {
      return res.status(400).send('Username already exists');
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { username, password: hashedPassword };
      
      // Insert new user into database
      db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
          console.error('Error creating user:', err);
          return res.status(500).send('Error creating user');
        }
        // Send success response
        res.status(201).send('User created');
      });
    } catch (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('Error creating user');
    }
  });
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Fetch user from database by username
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Server error');
    }

    // If no user found with the given username, return error
    if (results.length === 0) {
      return res.status(400).send('Invalid credentials');
    }

    const user = results[0];

    // Compare hashed password with input password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send token as response
    res.status(200).json({ token });
  });
};

/**
 * @swagger
 * /api/auth/changepassword:
 *   post:
 *     summary: Change user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               username:
 *                 type: string
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
exports.changepassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  // Fetch user from database by username
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Server error');
    }

    // If no user found with the given username, return error
    if (results.length === 0) {
      return res.status(400).send('Invalid credentials');
    }

    const user = results[0];

    // Compare current password with hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in database
    db.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username], (err, result) => {
      if (err) {
        console.error('Error changing password:', err);
        return res.status(500).send('Server error');
      }
      // Send success response
      res.status(200).send('Password changed');
    });
  });
};
