const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const viewRoutes = require('./Routes/viewRoute')
const userRoutes = require('./Routes/userRoute');
const PORT = process.env.PORT || 5000

dotenv.config({path: './config.env'})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DB_PASSWORD
);

mongoose.connect(DB ,{useNewUrlParser: true, useUnifiedTopology: true})
      .then(console.log("DB connection is successfull"))
mongoose.set("useCreateIndex" , true)

app.set('view engine','pug')
app.set('views' , path.join(__dirname,'views'))

/////////ROUTES/////////
app.use(passport.initialize())

require('./config/passport')(passport)

app.use('/' , viewRoutes)
app.use('/user',userRoutes)


app.listen(PORT,()=>{
    console.log("server is runnig at port 5000")
})

