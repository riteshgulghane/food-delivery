const Restaurant = require("../models/Restaurant"); // Import the Restaurant Model

class RestaurantService {
  // Method to get all restaurants
  async getAllRestaurants() {
    try {
      const restaurants = await Restaurant.find({});
      return restaurants;
    } catch (error) {
      console.error("Error in RestaurantService.getAllRestaurants:", error);
      throw new Error("Could not retrieve restaurants.");
    }
  }

  async addRestaurant(restaurantData) {
    try {
      const newRestaurant = new Restaurant(restaurantData);
      const savedRestaurant = await newRestaurant.save();
      return savedRestaurant;
    } catch (error) {
      console.error("Error in RestaurantService.addRestaurant:", error);
      throw new Error("Could not add restaurant.");
    }
  }

  async addBulkRestaurants(restaurantsData) {
    try {
      const newRestaurants = await Restaurant.insertMany(restaurantsData);
      return newRestaurants;
    } catch (error) {
      console.error("Error in RestaurantService.addBulkRestaurants:", error);
      throw new Error("Could not add bulk restaurants.");
    }
  }
}

module.exports = new RestaurantService();
