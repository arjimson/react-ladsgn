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
    const { title, description } = req.body;

    let newPost = new Posts({
        title
        ,description
        ,image_path: req.file.filename
        ,created: Date.now()
    })

    newPost.save()
        .then(doc => {
           res.send(doc.json())
        })
        .catch(err => {
            res.status(400).json({ msg: 'Error in saving...'})
        })
});



router.patch('/like', (req,res) => {
    const { id, user } = req.body;
    Posts.findOne(
        {
             _id: id 
        })
        .then(post => {
            
            const checkLikeOrUnlike = post.likes.includes(user);
            let likeOrUnlike = post.likes;

            !checkLikeOrUnlike ? likeOrUnlike.push(user) : likeOrUnlike = likeOrUnlike.filter(res => res !== user)
            
            Posts.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    likes: likeOrUnlike
                }
            }, {
                new: true
            }).then(result => {
                res.send(result);
            }).catch(err => {
                if(err) throw err
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