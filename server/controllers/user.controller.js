const userService = require('../services/user.service'); // Import the User Service

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users); // 200 OK
    } catch (error) {
      console.error('Controller Error: getAllUsers:', error.message);
      res.status(500).json({ message: error.message || 'Failed to fetch users' }); // 500 Internal Server Error
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user); // 200 OK
    } catch (error) {
      console.error('Controller Error: getUserById:', error.message);
      // Differentiate between 404 (not found) and 400 (bad ID format)
      if (error.message.includes('User not found')) {
        res.status(404).json({ message: error.message }); // 404 Not Found
      } else if (error.message.includes('Invalid user ID format')) {
        res.status(400).json({ message: error.message }); // 400 Bad Request
      } else {
        res.status(500).json({ message: error.message || 'Failed to fetch user' });
      }
    }
  }

  async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser); // 201 Created
    } catch (error) {
      console.error('Controller Error: createUser:', error.message);
      // Differentiate between 409 (conflict) and 400 (validation)
      if (error.message.includes('Email already registered')) {
        res.status(409).json({ message: error.message }); // 409 Conflict
      } else if (error.message.includes('Validation failed')) {
        res.status(400).json({ message: error.message }); // 400 Bad Request
      } else {
        res.status(500).json({ message: error.message || 'Failed to create user' });
      }
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(updatedUser); // 200 OK
    } catch (error) {
      console.error('Controller Error: updateUser:', error.message);
      if (error.message.includes('User not found')) {
        res.status(404).json({ message: error.message });
      } else if (error.message.includes('Invalid user ID format')) {
        res.status(400).json({ message: error.message });
      } else if (error.message.includes('Email already registered')) {
        res.status(409).json({ message: error.message });
      } else if (error.message.includes('Validation failed')) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message || 'Failed to update user' });
      }
    }
  }

  async deleteUser(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Controller Error: deleteUser:', error.message);
      if (error.message.includes('User not found')) {
        res.status(404).json({ message: error.message });
      } else if (error.message.includes('Invalid user ID format')) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message || 'Failed to delete user' });
      }
    }
  }

  // Login user
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error) {
      console.error('Controller Error: loginUser:', error.message);
      if (error.message.includes('Invalid email or password')) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Server error during login' });
      }
    }
  }
}

module.exports = new UserController();
