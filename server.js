// load express package and create app
var express = require('express');
var app     = express();

// send index.html file to user for the home page
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

// login routes
app.route('/login')
    // show the form GET http://localhost:1337/login
    .get(function(req, res) {
        res.send('this is the login form');
    })
    // process the form POST http://localhost:1337/login
    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });

// create routes for the admin section

// get an instance of the router
var adminRouter = express.Router();

// route middleware that will happen on every request
adminRouter.use(function(req, res, next) {
    
    // log each request to the console
    console.log(req.method, req.url);
    
    // continue doing what we were doing and go to the route
    next();
});

// middleware for routing with params
adminRouter.param('name', function(req, res, next, name) {
    // do name validation here *not implemented yet*
    // log something to confirm validation happened
    console.log('doing name validations on ' + name);

    // once validation is done save the new item in the req
    req.name = name;
    next();
});

// admin main page at http://localhost:1337/admin
adminRouter.get('/', function(req, res) {
    res.send('I am the dashboard!');
});

// users page at http://localhost:1337/admin/users
adminRouter.get('/users', function(req, res) {
    res.send('I show all the users!');
});

// route with parameters at http://localhost:1337/admin/users/:name
// req.params stores all the data that comes from the original
// user's request
// can be used to grab all user data that matches the name param
adminRouter.get('/users/:name', function(req, res) {
    res.send('hello ' + req.params.name + "!");
});

// posts page at http://localhost:1337/admin/posts
adminRouter.get('/posts', function(req, res) {
    res.send('I show all the posts!');
});


app.use('/admin', adminRouter);

// start the server
app.listen(1337);
console.log('app hosted in port 1337')