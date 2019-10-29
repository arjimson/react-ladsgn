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
    let { count, start } = req.query;
    Posts.find()
    .sort({ created: -1 })
    .skip(parseInt(start))
    .limit(parseInt(count))
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

router.post('/like', (req, res) => {
    const id = req.body.params.id, user = req.body.params.user;

    Posts.findOne({ _id: id })
    .then(post => {
        post.likes.push({ liked: true, user: user });
        post.save()
        .then(() => {
            res.send(post)
        })
        .catch(err => {
            console.log(err)
        })
    })
});

router.post('/unlike', (req, res) => {
    const { id, user } = req.body.params;

    Posts.findOne({ _id: id })
    .then(post => {
        const likeId = post.likes.filter(x => x.user === user).map(x => x._id);

        post.likes.id(likeId).remove()
        post.save()
        .then(() => {
            res.send(post)
        })
    })
})

router.post('/comment', (req, res) => {
    const { id, comment, user } = req.body;

    Posts.findOne({ _id: id })
    .then(post => {
        post.comments.push({ comment: comment, user: user })
        post.save()
        .then(() => {
            res.send(post)
        })
    })
})

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

module.exports = router;