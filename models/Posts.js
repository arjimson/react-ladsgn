const mongoose = require('mongoose');
const Scehma = mongoose.Schema;

const LikeSchema = new Scehma({
    liked: {
        type: Boolean,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

const PostsSchema = new Scehma({
    title: {
        type: String
    },
    image_path: {
        type: String,
        required: true
    },
    likes: [LikeSchema],
    created: {
        type: String,
        required: true
    }
})

module.exports = Posts = mongoose.model('posts', PostsSchema);