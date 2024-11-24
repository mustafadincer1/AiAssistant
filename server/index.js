const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const verify = require('./routes/verifyToken');
app = express();
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3001', // Specify the origin you want to allow
    credentials: true, // Enable credentials
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));


app.use(express.json());
app.use(cookieParser());

const authRoute = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');
app.use('/api/user', authRoute);

const openaiRoute = require('./routes/openai');
app.use('/api',openaiRoute);


app.get('/',verifyToken,(req,res)=>{
    return res.json({Status:"Success",user :req.user});
})
app.listen(3000, () => console.log('Server is up and running on port 3000'));