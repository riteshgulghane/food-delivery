const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

// Login route
router.post('/login', userController.loginUser);

module.exports = router; // Export the router
