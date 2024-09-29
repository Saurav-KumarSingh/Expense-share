const jwt = require('jsonwebtoken');
const usermodel = require('../../models/usermodel');
const expensemodel = require('../../models/expensemodel');

const updateExpense = async (req, res) => {
    try {
        const {expensedata, name, members } = req.body;
        const { expenseId } = req.params; 

        // Validate members
        if (!Array.isArray(members)) {
            return res.status(400).json({ success: false, message: "Invalid members data. Must be an array." });
        }

        // Find the existing expense by ID
        const expense = await expensemodel.findById(expenseId);

        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }

        // Update expense fields
        expense.expensedata = expensedata;
        expense.name = name;
        expense.members = [...members, req.user]; // Ensure the current user is also a member

        // Save updated expense
        await expense.save();

        // Update current user's groupName if not already in the list
        await usermodel.updateOne(
            { _id: req.user },
            { $addToSet: { groupName: expense._id } }  // Ensure the expense ID is added to the groupName
        );

        // Update each new member's groupName field
        await usermodel.updateMany(
            { _id: { $in: members } },
            { $addToSet: { groupName: expense._id } }
        );

        // Remove the expense from users who are no longer members
        const previousMembers = expense.members.map(member => member.toString());
        const removedMembers = previousMembers.filter(member => !members.includes(member));
        
        if (removedMembers.length > 0) {
            await usermodel.updateMany(
                { _id: { $in: removedMembers } },
                { $pull: { groupName: expense._id } }  // Remove the expense from the users who are no longer part of it
            );
        }

        // Send response
        res.status(200).json({ success: true, expense, message: 'Expense updated successfully' });

    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = updateExpense;
