// Importing necessary modules
const express = require('express');
const dotenv = require('dotenv');
// Importing database configuration
let db = require('./config/db');
// Importing authentication routes
const authRoutes = require('./routes/auth');
// Importing task routes
const taskRoutes = require('./routes/tasks');
// Importing Swagger UI and Swagger specification
const { swaggerUi, swaggerSpec } = require('./swagger');

// Loading environment variables from .env file
dotenv.config();

// Creating an Express application
const app = express();

// Parsing incoming JSON requests
app.use(express.json());

// Mounting authentication routes
app.use('/api/auth', authRoutes);
// Mounting task routes
app.use('/api/tasks', taskRoutes);

// Mounting Swagger UI to serve API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Defining the port to listen on, using environment variable if available, otherwise defaulting to 5001
const PORT = process.env.PORT || 5001;
// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Importing MySQL module
const mysql = require('mysql2');

// Loading environment variables again
dotenv.config();

// Creating a MySQL connection
db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Glimpsesnehru1947',
  database: process.env.DB_NAME || 'task_manager'
});

// Connecting to the database
db.connect((err) => {
  // Handling connection errors
  if (err) {
    console.error('Database connection failed:', err);
    // Exiting the process if connection fails
    process.exit(1); 
  }
  // Logging successful connection
  console.log('Database connected successfully');
});

// Exporting the database connection module for use in other parts of the application
module.exports = db;
