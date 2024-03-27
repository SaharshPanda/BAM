const express = require("express");
const { createBudgetForm, getBudget, deleteBudget, updateBudget } = require("../controllers/budgetController");
const router = express.Router();

router.post("/createBudget", createBudgetForm);

router.get("/getBudget/:userId", getBudget);

router.delete("/deleteBudget/:id", deleteBudget);

router.put("/updateBudget/:id", updateBudget);

module.exports = router;