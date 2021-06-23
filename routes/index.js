var express = require('express');
var router = express.Router();
const postModel = require('../models/posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/add-post', async (req, res) => {
  const newPost = new postModel({
    title: req.body.title,
    description: req.body.description,
    datePublication: req.body.datePublication,
    author: req.body.author,
    category: req.body.category
  });
  const savedPost = await newPost.save();

  res.redirect('/');
});

router.get('/posts', async (req, res) => {
  const posts = await postModel.find();
  let categories = new Set();
  posts.forEach(post => categories.add(post.category));
  let users = new Set();
  posts.forEach(post => {
    users.add(post.author);
    post.comments.forEach(comment => users.add(comment.author));
  });

  res.render('posts', { posts, categories, users });
})

router.post('/add-comment', async (req, res) => {
  const post = await postModel.findById(req.body.postId);
  post.comments.push({
    description: req.body.description,
    author: req.body.author,
    datePublication: req.body.datePublication
  });
  const savedPost = await post.save();

  res.redirect('/posts');
});

router.get('/delete-post', async (req, res) => {
  const posts = await postModel.find();
  await postModel.deleteOne({
    title: posts[req.query.index].title,
    description: posts[req.query.index].description,
    datePublication: posts[req.query.index].datePublication,
    author: posts[req.query.index].author,
    category: posts[req.query.index].category,
  })

  res.redirect('/posts')
})

router.post('/filter-category', async (req, res) => {
  let posts = await postModel.find();
  let categories = new Set();
  posts.forEach(post => categories.add(post.category));
  let users = new Set();
  posts.forEach(post => {
    users.add(post.author);
    post.comments.forEach(comment => users.add(comment.author));
  });
  posts = posts.filter(post => post.category === req.body.category);

  res.render('posts', { posts, categories, users });
})

router.post('/filter-user', async (req, res) => {
  let posts = await postModel.find();
  let categories = new Set();
  posts.forEach(post => categories.add(post.category));
  let users = new Set();
  posts.forEach(post => {
    users.add(post.author);
    post.comments.forEach(comment => users.add(comment.author));
  });
  posts = posts.filter(post => post.author === req.body.user || post.comments.find(comment => comment.author === req.body.user));

  res.render('posts', { posts, categories, users });
})

module.exports = router;
