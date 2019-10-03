const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Datastore = require('nedb');
const posts = new Datastore({ filename: 'nedb/posts.db', autoload: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + './../../public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
    res.send('Haha')
})

router.post('/', upload.single('selectedFile'), (req, res, next) => {
    console.log(req.file.path)
})

module.exports = router;