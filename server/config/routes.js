const users = require('../controllers/users.js');
const comments = require('../controllers/comments.js');
const posts = require('../controllers/posts.js');
//-.-. .- -- . .-. --- -. / -- .- .-. ... .... .- .-.. .-..//
module.exports = function(app){
    // Login page for root route
    app.get('/', function(req,res){
        console.log(req.session.id);
        return res.render('login', {errors:""})
    })
    // Validate and post login info
    app.post('/login', function(req,res){
        users.login(req,res);
    })
    // Registration page
    app.get('/register', function(req,res){
        res.render('register', {errors:"", input:"", passwordMatch: ""});
    })
    // Handle posting registration to db.
    app.post('/register', function(req,res){
        users.register(req,res);
    }) 
    // Page render to after logging in..
    app.get('/main', function(req,res){
        // Post.find({}, function(err, posts){
        //     if(err){
        //         console.log(err);
        //     } else {
        //         return res.render('main', {posts: posts});
        //     }
        // })
        return res.render('main')
    })

    // Handle posting Posts to db.
    app.get('/post', Posts.index){ //function(req,res){
        // req.body.user = req.session.user_id;
        // console.log('body: ', req.body);
        // Post.create(req.body, function(err, post){
        //     if(err){
        //         console.log(err);
        //     } else {
        //         console.log('post: ', post);
        //         User.findByIdAndUpdate(req.session.user_id, {$push: { post: post._id } }, { new: true }, function(err, user) {
        //             if(err){
        //                 console.log(err);
        //             } else {
        //                 console.log('user after manipuation: ', user);
        //                 return res.redirect('/main');
        //             }
        //         })
        //     }
        // })
    })

    // Handle posting comments on posts to db.
    app.post('/comments/:id', function(req,res){
        req.body.user = req.session.user_id;
        req.body.post = req.params.id;
        console.log(req.body);
        return res.redirect('/main');
    })
}