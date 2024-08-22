const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
        require:true
    },
    email: {
        type:String,
        unique:true,
        require:true
    },
    password: {
        type:String,
        require:true
    }

    
})

module.exports = mongoose.model('user', userSchema);