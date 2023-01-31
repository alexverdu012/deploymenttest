const {Router, response} = require('express')
const router = Router()
const{hashPassword, comparePassword} = require('../usitls/helpers')

const User = require('../database/schema/User')
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) return res.sendStatus(400)
    const UserDB = await User.findOne({ email });
    if (!UserDB) return res.status(401).send({"msg": "Wrong user or Password"})
    if (!comparePassword(password, UserDB.password)) return res.status(401).send({"msg": "Wrong user or Password"})
    else {
        req.session.user = UserDB
        return res.sendStatus(200)
    }
})


router.post('/register', async (req, res) => {
    const {email} = req.body
    if (email) {
        const UserDB = await User.findOne({ email });
        if (UserDB) {
            res.status(400).send({msg: "User already exists"})
        } else {
            const password = hashPassword(req.body.password)
            console.log(password)
            const newUser =  await User.create({ password, email})
            res.sendStatus(201)
        }
    }
})


module.exports = router