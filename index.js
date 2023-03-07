const express=require("express")
require("dotenv").config()
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require("express-flash")
const connect = require("./models/db")
const userRoutes = require("./routes/userRoutes")
const profileRoutes = require("./routes/profileRoutes")
const postRoutes = require("./routes/postRoutes")
const app=express()



connect();
// Express session middleware
const store = new MongoDBStore({
    uri: process.env.DB,
    collection: 'sessions'
})



app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 7 * 24 * 60 * 60
    },
    store: store
}))



app.use(flash())
app.use((req, res, next) => {
    res.locals.message = req.flash()
    next();
})

app.use(express.static("./views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")

app.use(userRoutes);
app.use(profileRoutes)
app.use(postRoutes)



app.listen(process.env.PORT||5000,()=>{
    console.log("port is running")
})




















