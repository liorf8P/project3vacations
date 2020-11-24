const router = require('express').Router()
const myQuery = require('../db')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    try {
        const { firstname, lastname, username, password } = req.body

        if (!firstname || !lastname || !username || !password)
            return res.status(400).json({ err: true, msg: "missing some info" })

        const users = await myQuery(
            `SELECT username FROM users WHERE username = "${username}";`
        )
        if (users.length)
            return res.status(400).json({ err: true, msg: "username is taken" })

        const hash = await bcrypt.hash(password, 10)

        await myQuery(`INSERT INTO users
        (firstname, lastname, username, password)
        VALUES ("${firstname}","${lastname}", "${username}", "${hash}");`)

        res.status(201).json({ err: false, msg: 'user added , your now willsuccessfully be redicted to login page' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: true })
    }
})

module.exports = router