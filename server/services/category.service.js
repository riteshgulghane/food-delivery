const Category = require('../models/Category'); // Import the Category Model

class CategoryService {
  // Method to get all categories
  async getAllCategories() {
    try {
      const categories = await Category.find({});
      return categories;
    } catch (error) {
      console.error('Error in CategoryService.getAllCategories:', error);
      throw new Error('Could not retrieve categories.');
    }
  }

  async addCategory(categoryData) {
    try {
      const newCategory = new Category(categoryData);
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      console.error('Error in CategoryService.addCategory:', error);
      throw new Error('Could not add category.');
    }
  }

  async addBulkCategories(categoriesData) {
    try {
      const newCategories = await Category.insertMany(categoriesData);
      return newCategories;
    } catch (error) {
      console.error('Error in CategoryService.addBulkCategories:', error);
      throw new Error('Could not add bulk categories.');
    }
  }

  async bulkUpdateCategories(categoriesData) {
    try {
      console.log('Categories Data:', categoriesData);
      const newCategories = await Category.updateMany({}, { select: false });
      return newCategories;
    } catch (error) {
      console.error('Error in CategoryService.bulkUpdateCategories:', error);
      throw new Error('Could not update bulk categories.');
    }
  }
}

module.exports = new CategoryService();
