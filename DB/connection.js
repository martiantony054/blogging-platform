const mongoose = require('mongoose')

const connectstring = process.env.connectionstring

mongoose.connect(connectstring).then(res=>{
    console.log('server to mongodb');
    
}).catch(err=>{
    console.log("oops error in connectiong to database"+err);
    
}) 