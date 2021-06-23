const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    description: String,
    datePublication: Date,
    author: String,
});

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    datePublication: Date,
    author: String,
    category: String,
    comments: [comment]
});

const postModel = mongoose.model('posts', postSchema);

module.exports = postModel;