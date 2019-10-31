const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    liked: {
        type: Boolean,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
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
    ,likes: [LikeSchema]
    ,comments: [CommentSchema]
    ,created: {
        type: String,
        required: true
    }
})

module.exports = Posts = mongoose.model('posts', PostsSchema);