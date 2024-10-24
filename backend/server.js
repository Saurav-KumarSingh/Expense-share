const express=require('express');
const app= express();
const cookieParser= require('cookie-parser');
const router=require('./routes/routes');
const db=require('./config/mongoose_connect')
require('dotenv').config();
const cors=require('cors')

const corsOptions = {
    origin: 'https://expense-share-five.vercel.app/*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
};


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors(corsOptions));

console.log(process.env.PORT)
app.use('/api',router);
app.get('/',(req,res)=>{
    res.send('hey')
})
app.listen(process.env.PORT,()=>{
    console.log(`server is started: ${process.env.PORT}`);
});
