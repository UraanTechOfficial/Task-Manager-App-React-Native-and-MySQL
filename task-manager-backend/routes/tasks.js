const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/gettasks/:username', getTasks);
router.put('/savetasks/:username', createTask);
router.put('/updatetask/:id', updateTask);
router.delete('/deletetask/:id', deleteTask);

module.exports = router;
