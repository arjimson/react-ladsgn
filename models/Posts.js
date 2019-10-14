const mongoose = require('mongoose');
const Scehma = mongoose.Schema;

const PostsSchema = new Scehma({
    title: {
        type: String
    },
    image_path: {
        type: String,
        required: true
    },
    likes: {
        type: Array
    },
    created: {
        type: String,
        required: true
    }
})

module.exports = Posts = mongoose.model('posts', PostsSchema);