const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const PostsSchema = new Schema({
    title: {
        type: String
        ,required: true
    }
    ,description: {
        type: String
        ,required: true
    }
    ,image_path: {
        type: String,
        required: true
    }
    ,likes: {
        type: Array
    }
    ,comments: [CommentSchema]
    ,created: {
        type: String,
        required: true
    }
})

module.exports = Posts = mongoose.model('posts', PostsSchema);