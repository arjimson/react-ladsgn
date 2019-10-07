const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// const User = require('../../models/Users')

const Datastore = require('nedb')
const User = new Datastore('./nedb/users.db')
// const userSession = new Datastore('./nedb/user_session.db')

// userSession.loadDatabase()
User.loadDatabase()

router.post('/signin', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields!' })
    }

    User.find({ email }, (err, docs) => {
        if (err) throw err
        // validate if exist
        if (docs.length === 0) return res.status(400).json({ msg: 'User does not exist' })
        // validate password
        const user = docs[0];
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'Invalid username or password' })
                jwt.sign(
                    { id: user._id }
                    , config.get('jwtSecret')
                    , { expiresIn: 3600 }
                    , (err, token) => {
                        if (err) throw err
                        res.json({
                            token,
                            user: {
                                id: user._id
                                , firstName: user.firstName
                                , lastName: user.lastName
                                , email: user.email
                            }

                        })
                    }
                )
            })
    })



})

// @route   GET api/auth/user
// @desc    Get user data
// @access  private
router.get('/user', auth, (req, res) => {
    User.find({ _id: req.user.id }, (err, docs) => {
        if (err) throw err
        const user = docs[0];
        res.json({
            user: {
                id: user._id
                , firstName: user.firstName
                , lastName: user.lastName
                , email: user.email
            }
        })
    })
})


module.exports = router;