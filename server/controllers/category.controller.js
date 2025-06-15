const categoryService = require('../services/category.service');

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories); // 200 OK
    } catch (error) {
      console.error('Controller Error: getAllCategories:', error.message);
      res.status(500).json({ message: error.message || 'Failed to fetch categories' });
    }
  }

  async addCategory(req, res) {
    try {
      const categoryData = req.body;
      const newCategory = await categoryService.addCategory(categoryData);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Controller Error: addCategory:', error.message);
      res.status(500).json({ message: error.message || 'Failed to add category' });
    }
  }

  async addBulkCategories(req, res) {
    try {
      const categoriesData = req.body;
      const newCategories = await categoryService.bulkUpdateCategories(categoriesData);
      res.status(201).json(newCategories);
    } catch (error) {
      console.error('Controller Error: addBulkCategories:', error.message);
      res.status(500).json({ message: error.message || 'Failed to add bulk categories' });
    }
  }
}

module.exports = new CategoryController();
