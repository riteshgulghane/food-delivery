const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getAllCategories);

router.post("/", categoryController.addCategory);

router.post("/bulk", categoryController.addBulkCategories);

module.exports = router; // Export the router
