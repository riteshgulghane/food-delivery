
const restaurantService = require('../services/restaurant.service'); // Import the Restaurant Service

class RestaurantController {
  async getAllRestaurants(req, res) {
    try {
      const restaurants = await restaurantService.getAllRestaurants();
      res.status(200).json(restaurants); // 200 OK
    } catch (error) {
      console.error('Controller Error: getAllRestaurants:', error.message);
      res.status(500).json({ message: error.message || 'Failed to fetch restaurants' }); // 500 Internal Server Error
    }
  }

  async addRestaurant(req, res) {
    try {
      const restaurantData = req.body;
      const newRestaurant = await restaurantService.addRestaurant(restaurantData);
      res.status(201).json(newRestaurant); // 201 Created
    } catch (error) {
      console.error('Controller Error: addRestaurant:', error.message);
      res.status(500).json({ message: error.message || 'Failed to add restaurant' }); // 500 Internal Server Error
    }
  }

  async addBulkRestaurants(req, res) {
    try {
      const restaurantsData = req.body;
      const newRestaurants = await restaurantService.addBulkRestaurants(restaurantsData);
      res.status(201).json(newRestaurants); // 201 Created
    } catch (error) {
      console.error('Controller Error: addBulkRestaurants:', error.message);
      res.status(500).json({ message: error.message || 'Failed to add bulk restaurants' }); // 500 Internal Server Error
    }
  }
}

module.exports = new RestaurantController(); 