const expressAsyncHandler = require("express-async-handler");
const budget = require("../models/BudgetModel")

const createBudgetForm = expressAsyncHandler(async (req, res) => {
    const { name, type, category, creator, collaborators,attachments,approvers,rowCount,columnCount,form, isDraft, isSubmitted } = req.body;
    if (!name || !type || !category) {
      res.status(400);
      throw new Error({ Message: "All fields are mandatory" });
    }else {
      const budgetObject = {name, type, category, creator, collaborators,attachments,approvers,rowCount,columnCount,form, isDraft, isSubmitted, isApproved: "false"} 
      
        const createBudgetForm = await budget.create(budgetObject)
          res.status(200).json({"Budget Form" : createBudgetForm,
          "message" : "Budget Form Created Successfully"})
    }
  });

const getBudget = expressAsyncHandler(async (req, res) => {
  const budgetList =await budget.find();
  const userId = req.params?.userId
  console.log(userId)
  const filteredList = budgetList.filter((value)=> value?.creator === userId || value?.approvers?.includes(userId) || value?.collaborators?.includes(userId) )
  res.status(200).json(filteredList)
}
);

const deleteBudget = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    if (!id) {
      return res.status(400).json({ message: "Invalid budget ID" });
    }
    const budgetToDelete = await budget.findById(req.params.id);

    if (!budgetToDelete) {
      return res.status(404).json({ message: "Budget not found" });
    }
console.log("budgetToDelete",budgetToDelete)
await budgetToDelete.deleteOne();
    
    res.status(200).json("Budget Plan Deleted");
} catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error: error.message });
}
}
);

const updateBudget = expressAsyncHandler(async (req, res)=>{
  const availableBudget = await budget.findById(req.params.id);
  if(!availableBudget){
      res.status(404);
      throw new Error("User not found")

  }

  const updateAvailableUser = await budget.findByIdAndUpdate(req.params.id , req.body, {new: true}) 
      res.status(200).json(updateAvailableUser)
  })

module.exports = { createBudgetForm, getBudget, deleteBudget, updateBudget };
