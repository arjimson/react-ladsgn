const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// const User = require('../../models/Users')

const Datastore = require('nedb')
const User = new Datastore('./nedb/users.db')
User.loadDatabase()
// const userSession = new Datastore('./nedb/user_session.db')

// userSession.loadDatabase()

// using NEDB
router.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields!'})
    }

    User.find({ email }, (err, users) => {
        if(err) throw err
        if(users.length > 0) return res.status(400).json({ msg: 'User already exists'})
        const newUser = {
            firstName,
            lastName,
            email,
            password
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                User.insert(newUser, (err, user) => {
                    if(err) throw err
                    jwt.sign(
                        { id : user._id }
                        ,config.get('jwtSecret')
                        ,{ expiresIn : 3600 }
                        ,(err, token) => {
                            if(err) throw err
                            res.json({
                                token,
                                user: {
                                    id: user._id
                                    ,firstName: user.firstName
                                    ,lastName: user.lastName
                                    ,email: user.email
                                },
                                msg: "Your account successfully added. Login now!"
                            })
                        }
                    )
                })
            })
        })
    })

    // MongoDB 
    // User.find({ email })
    //     .then(user => {
    //         if(user) return res.status(400).json({ msg: 'User already exists'})
    //         const newUser = new User({
    //             firstName,
    //             lastName,
    //             email,
    //             password
    //         })
    //         // password encryption
    //         bcrypt.genSalt(10, (err, salt) => {
    //             bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                 if(err) throw err
    //                 newUser.password = hash
    //                 User.insert(newUser)
    //                 // newUser.save()
    //                     .then(user => {
    //                         // get jwt token
    //                         jwt.sign(
    //                             { id : user.id }
    //                             ,config.get('jwtSeceret'),
    //                             { expiresIn: 3600}
    //                             ,(err, token) => {
    //                                 if(err) throw err
    //                                 res.json({
    //                                     token,
    //                                     user: {
    //                                         id: user.id
    //                                         ,firstName: user.firstName
    //                                         ,lastName: user.lastName
    //                                         ,email: user.email
    //                                     }
    //                                 })
    //                             }
    //                         )
    //                     })
    //             })
    //         })
    //     })
})


module.exports = router;