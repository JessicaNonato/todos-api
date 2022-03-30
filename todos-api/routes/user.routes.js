const { Router } = require('express')
const User = require('../models/User')

const router = Router()

router.get('/', async (req, res) => {
    try{
        const users = await User.find({}, {passwordHash: 0}).populate('todos')
        res.status(200).json(users)
    } catch(error) {
        res.status(500).json({msg: error.message})
    }
})

module.exports = router