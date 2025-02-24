const mongoose = require('mongoose')


const connectDb = async ()=>{
    try {
        const conn = await  mongoose.connect(process.env.MONGO_URI);
        console.log(`connecter to ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1) //terminate the process
    }
}

module.exports= connectDb;