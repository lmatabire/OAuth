const express = require('express');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
 
//set engine
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:[keys.session.cookieKey]
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// initialize passport
 app.use(passport.initialize());
 app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongo db')
});

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { 
        user: req.user, 
    });
})

// Require Notes routes
require('./routes/post.route')(app);


app.listen(3000, () => {
    console.log('app now listerning for request on port 3000')
}) 