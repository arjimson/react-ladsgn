const express = require('express');
const router = express.Router();
const multer = require('multer');

const Posts = require('./../../models/Posts');
const Sample = require('./../../models/Sample');

// const Datastore = require('nedb');
// const posts = new Datastore({ filename: 'nedb/posts.db', autoload: true });

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
    Posts.find().sort({ created: 1 })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/sample', (req, res) => {
    Sample.find({})
    .then(doc => {
        res.json(doc)
    })
})

router.post('/', upload.single('selectedFile'), (req, res, next) => {
    let post = new Posts({
        title: 'The Title',
        image_path: req.file.filename,
        created: Date.now()
    })

    post.save()
    .then(doc => {
        res.send('Saved!')
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/sample', (req, res) => {
    const item = new Sample({
        title: req.body.item
    })

    item.save()
    .then(() => {
        console.log('Saved!')
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;

    Posts.findById(id)
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/like/:id', (req, res) => {
    const id = req.params.id;

    Posts.findOne({ _id: id })
    .then(post => {
        post.likes.push({ liked: true, user: 'remolalata' });
        post.save()
        .then(() => {
            console.log('Liked!')
        })
        .catch(err => {
            console.log(err)
        })
    })
});

module.exports = router;