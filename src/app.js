const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./config/db.js')
const {errorHandler,notFound} = require('./middleware/erroeMiddleware.js')
const userRoutes = require('./routes/userRoutes.js')

dotenv.config()
connectDb()
const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/user',userRoutes)

app.get('/',(req,res)=>{
    res.send("welcome to backend")
})

app.use(errorHandler)
app.use(notFound)

app.listen(PORT,console.log(`server running on port ${PORT}`))


// const express = require('express');
// const dotenv = require('dotenv');
// const connectDb = require('./config/db.js');

// dotenv.config();
// connectDb();

// const PORT = process.env.PORT || 5000;

// const app = express();

// app.get('/', (req, res) => {
//     res.send("Welcome to the backend");
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
