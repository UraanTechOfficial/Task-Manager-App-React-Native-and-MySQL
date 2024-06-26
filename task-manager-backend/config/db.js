const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Glimpsesnehru1947',
  database: process.env.DB_NAME || 'task_manager'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit the process if connection fails
  }
  console.log('Database connected successfully');
});

// Export the database connection module for use in other parts of the application
module.exports = db;
