const router = require('express').Router()
const myQuery = require('../db')

router.get('/reports', async (req, res) => {
    try {
        const getFollowedVacations = `SELECT city, usersFollow from vacations WHERE usersFollow > 0;`
        const getFollowedVacationsResualts = await myQuery(getFollowedVacations)

        res.json(getFollowedVacationsResualts)

    } catch (err) {
        console.log(err)
        res.json({ err })
    }
});


router.post('/add', async (req, res) => {
    try {
        const { user_id, vacation_id } = req.body
        if (!user_id || !vacation_id)
            return res.status(401).json({ error: true, msg: 'missing some info' })
            
        const AddFollowQuary = `INSERT INTO followvacations (user_id, vacation_id)
        VALUES(${user_id},${vacation_id});`

        const AddFollowtoVactions = `UPDATE vacations 
        SET usersFollow = usersFollow + 1 
        WHERE id = ${vacation_id};`
        
        await myQuery(AddFollowQuary)
        await myQuery(AddFollowtoVactions)

        res.status(200).json({ err: false, msg: "Follwed Successfully" })
    } catch (err) {
        res.status(500).json({ err })
        console.log(err)
    }
});

router.delete('/remove', async (req, res) => {
    try {
        const { user_id, vacation_id } = req.body
        
        if (!user_id || !vacation_id)
        return res.status(401).json({ error: true, msg: 'missing some info' })

        const DeleteVacationFollow = `DELETE from followvacations WHERE user_id=${user_id} and vacation_id=${vacation_id};`
        
        const DeletefromVacationsObject = `UPDATE vacations 
        SET usersFollow = usersFollow - 1 
        WHERE id = ${vacation_id};`
        
        await myQuery(DeleteVacationFollow);
        await myQuery(DeletefromVacationsObject);
        res.status(200).json({ err: false, msg: "UnFollwed Successfully" })
        
    } catch (err) {
        res.status(500).json({ err })
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user_id = req.params.id
        const q = `SELECT vacation_id from followvacations WHERE user_id = "${user_id}";`
        const data = await myQuery(q)
        res.json(data)
    } catch (err) {
        res.status(500).json({ err })
        console.log(err)
    }
});


module.exports = router