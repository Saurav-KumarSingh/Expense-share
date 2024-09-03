const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    groupName: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Group'
    },
    profilepic:{
        type:String,
    }
});

module.exports = mongoose.model('User', userSchema);
