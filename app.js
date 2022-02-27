//This file contains the express code for creating server and routing,which is much easier.

const express = require('express');
//Morgan is a http request logger middleware
const morgan = require('morgan'); 
//Used to connect to mongodb
const mongoose = require('mongoose');
//Used to create an instance of schema
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://netninja:test1234@nodetuts.nk7gb.mongodb.net/nodetuts?retryWrites=true&w=majority"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000)) //Only listens for request after database connection
  .catch(err => console.log(err));

// listen for requests
// app.listen(3000);

// register view engine
// ejs is used to render dynamic contents
// Default look at views folder
app.set('view engine', 'ejs');
// app.set('views', 'myviews');


// middleware & static files
//Browser cannot access static files such as stylesheets without the following command
//Look for static files in public folder
app.use(express.static('public'));

// This middleware is executed for every request
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
  });

  app.use(morgan('dev'));
  //dev is a mode of outputting the data there are others like tiny

//Next is very imp.After executing middleware the site wont load since it does not automatically move to the next code
//Explicitily mention to go on to the next block


// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
      title: 'new blog',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
  //result the saved collection 
    blog.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });


  app.get('/all-blogs', (req, res) => {
      //Method to get all the blogs
      //then is a promise
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get('/single-blog', (req, res) => {
    Blog.findById('621bd55c7dcb41d73d759622')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
  

  app.get('/', (req, res) => {
    res.redirect('/blogs');
  });


app.get('/about', (req, res) => {
  //title parameter is passed to the view about.ejs file with value About
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
// 404 page
// app.use() is a middleware it is executed for every request
// Comes to this statement if and only if the previous statement is not executed and response is not sent back
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});