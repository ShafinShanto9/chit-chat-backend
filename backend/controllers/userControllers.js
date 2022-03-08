const asyncHandler = require("express-async-handler");
const genaretToken = require('../config/genaretToken')
const User = require('../models/userModel')

// User Register
const registerUser = asyncHandler(async (req, res) => {
    //Distructrure From Request body
    const { name, email, password, pic } = req.body;

    
    //  Check all Fields are fill or not
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please Fill All The Fields")
    }

    // Check User Exists Or Not
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error("User Already Exists")
    }

    // If user not exists then create a user
    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    // if user create successfull

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: genaretToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("User Not Found")
    }

})

// User Login

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: genaretToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})

// Get  User By Searching
const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' }},
            { email : {$regex : req.query.search , $options : 'i'}} 
        ]
    } : {}
    
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
    res.send(users)
    
})

module.exports = {registerUser , authUser, allUser}