const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`${process.env.DB_URI}/expense`)
.then(()=>{
    console.log('connected');
})
.catch((err)=>{
    console.log('err : '+err);
})

module.exports= mongoose.connection;