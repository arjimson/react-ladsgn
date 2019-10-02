const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Datastore = require('nedb');
const posts = new Datastore({ filename: 'nedb/posts.db', autoload: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

router.get('/', (req, res) => {
    res.send('Haha')
})

router.route('/uploadmulter').post(upload.single('imageData'), (req, res, next) => {
    console.log(req.body);
    let post = {
        imageName: req.body.imageName,
        imageData: req.file.path
    }

    posts.insert(post, (err, doc) => {
        console.log(err)
    })
})

module.exports = router;