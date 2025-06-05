const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  select: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Category', categorySchema);