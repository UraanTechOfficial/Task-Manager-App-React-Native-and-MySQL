const db = require('../config/db');

/**
 * @swagger
 * /api/tasks/{username}:
 *   get:
 *     summary: Get all tasks for a specific user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username to fetch tasks for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
exports.getTasks = (req, res) => {
  const { username } = req.params;
  // Check if username parameter is provided
  if (!username) {
    return res.status(400).send('Username is required');
  }

  // SQL query to fetch tasks for the given username
  const query = 'SELECT tasks.* FROM tasks WHERE tasks.username = ?';

  // Execute the SQL query
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).send('Error fetching tasks');
    }
    // Send the tasks as JSON response
    res.status(200).json(results);
  });
};

/**
 * @swagger
 * /api/tasks/{username}:
 *   post:
 *     summary: Create a new task for a specific user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username to create task for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
exports.createTask = (req, res) => {
  const { title, description, due_date, status } = req.body;
  const { username } = req.params;

  // Check if required fields are provided
  if (!title || !username) {
    return res.status(400).send('Title and username are required');
  }

  // Construct task object
  const task = { title, description, due_date, status, username };
  // SQL query to insert task into database
  db.query('INSERT INTO tasks SET ?', task, (err, result) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).send('Error creating task');
    }
    // Send success response
    res.status(201).send('Task created');
  });
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;

  // Check if required fields are provided
  if (!id || !title) {
    return res.status(400).send('Task ID and title are required');
  }

  // SQL query to update task
  const query = 'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?';
  db.query(query, [title, description, due_date, status, id], (err, result) => {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).send('Error updating task');
    }
    // Send success response
    res.status(200).send('Task updated');
  });
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  // Check if task ID is provided
  if (!id) {
    return res.status(400).send('Task ID is required');
  }

  // SQL query to delete task
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).send('Error deleting task');
    }
    // Send success response
    res.status(200).send('Task deleted');
  });
};
