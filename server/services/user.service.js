const User = require('../models/User'); // Import the User Model
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

class UserService {
  // Method to get all users
  async getAllUsers() {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      console.error('Error in UserService.getAllUsers:', error);
      throw new Error('Could not retrieve users.');
    }
  }

  // Method to get a user by ID
  async getUserById(userId) {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        // You might want to throw a specific "NotFound" error here
        throw new Error('User not found.');
      }
      return user;
    } catch (error) {
      console.error('Error in UserService.getUserById:', error);
      // Check if it's a Mongoose CastError (invalid ID format)
      if (error.name === 'CastError') {
        throw new Error('Invalid user ID format.');
      }
      throw new Error('Could not retrieve user.');
    }
  }

  // Method to create a new user
  async createUser(userData) {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      // Optionally return the saved user without password
      const userResponse = savedUser.toObject();
      delete userResponse.password;
      return userResponse;
    } catch (error) {
      console.error('Error in UserService.createUser:', error);
      if (error.code === 11000) {
        // Duplicate key error
        throw new Error('Email already registered.');
      }
      if (error.name === 'ValidationError') {
        // Mongoose validation error
        const errors = Object.values(error.errors).map(el => el.message);
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }
      throw new Error('Could not create user.');
    }
  }

  // Method to update a user
  async updateUser(userId, updateData) {
    try {
      // Set runValidators to true to apply schema validators on update
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      }).select('-password');
      if (!updatedUser) {
        throw new Error('User not found.');
      }
      return updatedUser;
    } catch (error) {
      console.error('Error in UserService.updateUser:', error);
      if (error.name === 'CastError') {
        throw new Error('Invalid user ID format.');
      }
      if (error.code === 11000) {
        // Duplicate key error
        throw new Error('Email already registered.');
      }
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(el => el.message);
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }
      throw new Error('Could not update user.');
    }
  }

  // Method to delete a user
  async deleteUser(userId) {
    try {
      const result = await User.findByIdAndDelete(userId);
      if (!result) {
        throw new Error('User not found.');
      }
      return { message: 'User deleted successfully.' };
    } catch (error) {
      console.error('Error in UserService.deleteUser:', error);
      if (error.name === 'CastError') {
        throw new Error('Invalid user ID format.');
      }
      throw new Error('Could not delete user.');
    }
  }

  // Method to handle user login
  async loginUser(email, password) {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Validate password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      // Return user data (without password) and token
      const userResponse = user.toObject();
      delete userResponse.password;

      return { user: userResponse, token };
    } catch (error) {
      console.error('Error in UserService.loginUser:', error);
      throw error; // Re-throw to be handled by the controller
    }
  }
}

module.exports = new UserService();
