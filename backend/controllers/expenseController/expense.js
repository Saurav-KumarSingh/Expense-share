// const jwt = require('jsonwebtoken');
// const usermodel = require('../../models/usermodel');
// const expensemodel = require('../../models/expensemodel')

// const expense = async (req, res) => {

//     try {
//         const { expensedata ,name,members} = req.body;
//         console.log(members);

//         const user = await usermodel.findOne({ _id: req.user }).exec();
//         const expense = await expensemodel.create({ expensedata ,name,user:user._id});
//         await expense.members.push(user._id,members);
//         await expense.save();


//         await user.groupName.push(expense._id);
//         await user.save();

//         await Promise.all(members.map(async (memberId) => {
//             const member = await usermodel.findOne({ _id: memberId }).exec();
//             if (member) {
//                 if (!member.groupName.includes(expense._id)) {
//                     member.groupName.push(expense._id);
//                     await member.save();
//                 }
//             }
//         }));
//         res.send({expense,user});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

// module.exports = expense;



const jwt = require('jsonwebtoken');
const usermodel = require('../../models/usermodel');
const expensemodel = require('../../models/expensemodel');

const createExpense = async (req, res) => {
    try {
        const { expensedata, name, members } = req.body;

        // Log the members to check if it's an array
        // console.log('Received members:', members,req.user);

        // Check if members is an array
        if (!Array.isArray(members)) {
            return res.status(400).json({ success: false, message: "Invalid members data. Must be an array." });
        }

        // 1. Create the expense
        const expense = await expensemodel.create({
            expensedata,
            name,
            user: req.user,
            members: [...members, req.user]  // Ensure the current user is also a member
        });

        // Update current user's groupName field with the new expense ID
        await usermodel.updateOne(
            { _id: req.user },
            { $addToSet: { groupName: expense._id } }  // Use $addToSet to avoid duplicates
        );
        //  Update each member's groupName field with the new expense ID
        await usermodel.updateMany(
            { _id: { $in: members } },
            { $addToSet: { groupName: expense._id } }  // Use $addToSet to avoid duplicates
        );

        // Send response
        res.status(200).json({ success: true, expense, message: 'Expense created successfully' });

    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = createExpense;
