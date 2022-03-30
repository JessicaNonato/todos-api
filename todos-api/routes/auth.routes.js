const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = Router()

router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body
    try{
        //verificar se os campos estão preenchidos
        if (!name || !email || !password) {
            throw new Error('All fields are required')
        }
        //verificar se o usuário já existe
        const user = await User.findOne({ email })
        if(user) {
            throw new Error('User alredy exists')
        }
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)
        const newUser = await User.create(
            {
                name,
                email,
                passwordHash: hash
            }
        )
        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            todos: newUser.todos
        })
    } catch(error){
        if(error.message === 'User alredy exists'){
            res.status(400).json({ msg: error.message })
        }
        res.status(500).json({ msg: error.message })
    }
})

router.post('/login', async(req,res) =>{
    const {email, password} = req.body
    try{
     
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error ('Email or password invalid')
        }
        const compareHash = await bcrypt.compare( password, user.passwordHash)
        if(!compareHash) {
            throw new Error( 'Email or password invalid' )
        }
        const payload ={
            email,
            name: user.name,
            id: user._id
        }
        const token = jwt.sign(payload, process.env.SECRET_JWT)
        res.status(200).json({ user:payload, token })
    } catch (error){
        res.status(401).json({msg: error.message})
    }
})

module.exports = router