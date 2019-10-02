const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Datastore = require('nedb');
const posts = new Datastore({ filename: 'nedb/posts.db', autoload: true });

const storage = multer.diskStorage({
    diskStorage: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage }).single('file')

router.get('/', (req, res) => {
    res.send('Haha')
})

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }

        return res.status(200).send(req.file)
    })
})

module.exports = router;