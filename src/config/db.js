const mongoose = require('mongoose');
require('dotenv').config()

async function connect_mongoose() {
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
    }catch(err)
    {
        console.log("Error while connecting to mongoose :"+err.message);
    }
}
module.exports = connect_mongoose;