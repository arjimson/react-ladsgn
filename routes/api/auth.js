const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('../../models/Users')

router.post('/signin', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields!' })
    }

    User.find({ email })
        .then(users => {
            if(users.length === 0) return res.status(400).json({ msg: 'User does not exist' })
            const user = users[0]
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid username or password' })
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
                                    , userName: user.userName
                                    , firstName: user.firstName
                                    , lastName: user.lastName
                                    , email: user.email
                                }
    
                            })
                        })
                }) 
        })
        .catch(err => {
            if(err) throw err
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
                , userName: user.userName
                , firstName: user.firstName
                , lastName: user.lastName
                , email: user.email
            }
        })
    })
})


module.exports = router;