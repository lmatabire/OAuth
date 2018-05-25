const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy({
    //options for the google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our db
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser) {
            // already have the user
            console.log('current user is: ', currentUser);
            done(null, currentUser);
        } else {
            // if not, create user in our db
            new User({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.image.url
            }).save().then((newUser) => {
                console.log('new user created: ' + newUser);
                
                done(null, newUser);
            });
        }
    })
    // Student.findOne({stud_id: Object.id}).then((currentStudent) => {
    //     if(currentStudent) {
    //         // already have the user
    //         console.log('current user is: ', currentStudent);
    //         done(null, currentStudent);
    //     } else {
    //         // if not, create user in our db
    //         new Student({
    //             stud_name: profile.displayName,
    //             stud_id: profile.id,
    //             online: profile._json.image.url
    //             campus: 
    //         }).save().then((newUser) => {
    //             console.log('new user created: ' + newUser);
    //             done(null, newUser);
    //         });
    //     }
    // })
})
)