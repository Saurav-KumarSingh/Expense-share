// const mongoose = require('mongoose');

// const groupSchema = mongoose.Schema({
//     name: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',

//     },
//     members: {
//         type: [mongoose.Schema.Types.ObjectId],
//         ref: 'User'
//     },
//     expensedata: {
//         type: [],
//     }
// });

// module.exports = mongoose.model('Group', groupSchema);


const mongoose = require('mongoose');

// Define a sub-schema for expensedata items
const expenseItemSchema = new mongoose.Schema({
    contributer:{
        type:String,
        required:true,
        
    },
    item: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    }
});

// Define the main group schema
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    expensedata: [expenseItemSchema]  // Use the defined sub-schema for array of expense items
});

module.exports = mongoose.model('Group', groupSchema);
