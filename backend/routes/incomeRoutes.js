const express = require("express");
const {
    addIncome,
    getallIncome,
    deleteIncome,
    downloadIncomeExcel,
} = require("../controllers/incomeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome); // Add income
router.get("/get", protect, getallIncome); // Get all incomes
router.get("/downloadexcel", protect, downloadIncomeExcel); // Download income as Excel
router.delete("/:id", protect, deleteIncome); // Delete income by ID

module.exports = router;