const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Datastore = require('nedb');
const posts = new Datastore({ filename: 'nedb/posts.db', autoload: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/src/assets/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
    posts.find({}).sort({ created: 1 }).exec((err, docs) => {
        res.json(docs)
    })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;

    posts.find({ _id: id }, (err, docs) => {
        res.json(docs)
    })
})

router.post('/', upload.single('selectedFile'), (req, res, next) => {
    let post = {
        image_path: req.file.filename,
        created: Date.now()
    }

    posts.insert(post, (err, doc) => {
        res.send(doc)
    })
});

router.get('/like/:id', (req, res) => {
    const id = req.params.id;
    posts.update({ _id: id }, { $set: { likes: { liked: true, user_id: 123 } } })
    res.json(req.params.id)
})

module.exports = router;