const router = require('express').Router()
const myQuery = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password)
            return res.status(400).json({ err: true, msg: "missing some info" })

        const user = await myQuery(`SELECT * FROM users WHERE username = "${username}"`)

        if (!user.length)
            return res.status(400).json({ err: true, msg: "username not found" })

        const isPasswordCorrect = await bcrypt.compare(password, user[0].password)

        if (!isPasswordCorrect)
            return res.status(400).json({ err: true, msg: "wrong password" })

        const token = jwt.sign({ ...user[0], password: 'not this time, sir' }, process.env.TOKEN_SECRET)
        res.json({ err: false, token })

    } catch (err) {
        console.log(err)
        res.status(500).json({ err: true, msg: err })
    }
})

module.exports = router