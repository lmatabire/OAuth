var express = require('express');
var router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
        // if user is not logged in
        res.redirect('/auth/login');
    } else {
        // if logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // res.render('profile', {user: req.user});
    res.render('profile', {user: req.user})
})


router.get('/posts', (req, res) => {
    res.render('posts', {posts: req.posts})
})


module.exports = router;