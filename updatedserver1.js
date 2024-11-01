const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

const mongoose = require('mongoose')

// this is always below.
const app = require('./app1');



//// CONNECTING MONGODB
mongoose.connect(process.env.conn_str, {
// useNewUrlParser: true. this is used for older versions of nodejs.
}).then((conn) =>{
    //console.log(conn);
    console.log("Database Connected Successfully..");
}).catch((error) =>{
console.log("Error has Occured")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("Running on port: 4000");
})
