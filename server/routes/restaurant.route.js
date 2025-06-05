const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/restaurant.controller");

router.get("/", restaurantController.getAllRestaurants);

router.post("/", restaurantController.addRestaurant);

router.post("/bulk", restaurantController.addBulkRestaurants);

module.exports = router; // Export the router
