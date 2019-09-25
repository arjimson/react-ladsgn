const express = require('express');
const router = express.Router();

const Datastore = require('nedb');
const posts = new Datastore({ filename: 'nedb/posts.db', autoload: true });

router.get('/', (req, res) => {
    res.send('Haha')
})

router.post('/', (req, res) => {
    let post = {
        name: 'Remo'
    }

    posts.insert(post, (err, docs) => {
        res.send(docs)
    })
})

module.exports = router;