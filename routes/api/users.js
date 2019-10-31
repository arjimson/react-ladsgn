const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const Users = require('../../models/Users')

router.post('/signup', (req,res) => {
    const { firstName, lastName, email, password, userName} = req.body;

    const newUser = new Users({
        firstName
        ,lastName
        ,email
        ,password
        ,userName
    })
    // res.send(newUser)

    if(!firstName || !lastName || !email || !password || !userName) {
        return res.status(400).json({ msg: 'Please enter all fields!'})
    }

    Users.find({ email })
        .then(user => {
            // res.send(user)
            if(user.length > 0) {
               return res.status(400).json({ msg : 'User exists!'})
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id : user._id }
                                ,config.get('jwtSecret')
                                ,{ expiresIn : 3600 }
                                ,(err, token) => {
                                    if(err) throw err
                                    res.json({
                                        token
                                        ,user: {
                                            id: user._id
                                            ,userName: user.userName
                                            ,firstName: user.firstName
                                            ,lastName: user.lastName
                                            ,email: user.email 
                                        }
                                    })
                            })
                        })
                        .catch(err => {
                            if(err) throw err
                        })
                })
            })
        })
})

module.exports = router;