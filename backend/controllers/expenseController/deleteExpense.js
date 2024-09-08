const usermodel = require('../../models/usermodel');
const expensemodel = require('../../models/expensemodel');

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id; 
    const expense = await expensemodel.findById(expenseId);
    
    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    // Remove the expense from the expensemodel
    await expensemodel.findByIdAndDelete(expenseId);

    //  Remove the expense ID from all users' groupName array
    await usermodel.updateMany(
      { groupName: expenseId },  // Find users where groupName contains this expense ID
      { $pull: { groupName: expenseId } }  // Remove the expense ID from the groupName array
    );

    // 4. Send success response
    res.status(200).json({ success: true, message: "Expense deleted Successfully" });
    
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = deleteExpense;
