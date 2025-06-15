const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  restaurantThumbnail: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  minimumAmount: {
    type: Number,
    required: true,
  },
  currencySymbol: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
