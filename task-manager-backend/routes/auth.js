const express = require('express');
const { login, signup, changepassword } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.put('/changePassword', changepassword);

module.exports = router;
