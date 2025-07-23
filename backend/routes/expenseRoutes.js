const express = require("express");
const {
    addExpense,
    getallExpense,
    deleteExpense,
    downloadExpenseExcel,
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense); // Add expense
router.get("/get", protect, getallExpense); // Get all expenses
router.get("/downloadexcel", protect, downloadExpenseExcel); // Download expense as Excel
router.delete("/:id", protect, deleteExpense); // Delete expense by ID

module.exports = router;