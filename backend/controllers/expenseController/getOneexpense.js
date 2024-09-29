const expensemodel = require('../../models/expensemodel');
const usermodel = require('../../models/usermodel');

const getSingleExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;  
        console.log(req.params)

        // Find the expense by ID and populate the members field to get their emails
        const expense = await expensemodel.findById(expenseId).populate({
            path: 'members',    // Populate members field
            select: 'email'     // Only select the email field from each user
        });

        // If no expense is found, send a 404 response
        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }

        // Get just the emails of the members
        const memberEmails = expense.members.map(member => member.email);

        // Send back the found expense along with member emails
        res.status(200).json({ success: true, expense, memberEmails });
    } catch (error) {
        console.error('Error fetching expense:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = getSingleExpense;
