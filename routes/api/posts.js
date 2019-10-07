const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Datastore = require('nedb');
const posts = new Datastore({ filename: 'nedb/posts.db', autoload: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
    posts.find({}, (err, docs) => {
        res.send(docs)
    })
})

router.post('/', upload.single('selectedFile'), (req, res, next) => {
    let post = {
        image_path: req.file.path
    }

    posts.insert(post, (err, doc) => {
        res.send(doc)
    })
})

module.exports = router;