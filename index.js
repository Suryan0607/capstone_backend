require("dotenv").config();

const express = require ("express");

const router = express.Router();

const app = express();

//Cross Origin Resource Sharing
const cors=require('cors');

//Importing DataBase
const { dataBase } = require('./db/mongoDB');

//Importing Utils
const {requireSignIn, isAuth} = require('./utils/authentication');
const {isAdmin}=require('./utils/admin')

//MongoDB Connection 
dataBase();

//Importing routers
const generalRoutes = require('./routers/generalRoute');
const authRoutes = require('./routers/authRoute');

const studentRoutes = require('./routers/studentRoute');
const mentorRoutes = require('./routers/mentorRoute')
//middleware
app.use(cors());
app.use(express.json());






app.use('/api', authRoutes); //Authentication Routes:

app.use('/api', requireSignIn,isAuth, mentorRoutes);

app.use('/api', requireSignIn, isAuth, studentRoutes);



const PORT = process.env.PORT || 8081;

const server=app.listen(PORT,()=>{
     console.log(`App listening On Port ${PORT}...`)
})


