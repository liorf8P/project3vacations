const router = require('express').Router()
const myQuery = require('../db')
const VerifyUser = require('../verifyuser')

router.get('/try', async (req, res) => { // שירוץ תמיד באירוקו
    try {
        const vacations = `SELECT * from vacations;`
        const data = await myQuery(vacations)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json({ err })
    }
});


router.post('/add', async (req, res) => {
    try {
        const { country, city, godate, backdate, image, description, price } = req.body
        
        if (!country || !city || !godate || !backdate || !image || !description || !price) {
            return res.status(400).json({ err: true, msg: "missing details" })
        }

        const q = `INSERT INTO vacations (country, city, godate, backdate, image, description, price )
        VALUES("${country}","${city}","${godate}","${backdate}","${image}","${description}",${price});`
        await myQuery(q)
        res.status(200).json({ err: false, msg: "Trip Add Successfully" })

    } catch (err) {
        res.status(500).json({ err: true, msg: err })
        console.log(err)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const { country, city, godate, backdate, image, description, price } = req.body

        if (!country || !city || !godate || !backdate || !image || !description || !price) {
            return res.status(400).json({ err: true, msg: "all state are required !" })
        }

        const q = `UPDATE vacations SET 
        country = "${country}", 
        city = "${city}", 
        godate = "${godate}", 
        backdate = "${backdate}", 
        image = "${image}", 
        description = "${description}", 
        price = ${price}
        WHERE id = ${req.params.id};`

        await myQuery(q)
        res.status(200).json({ err: false, msg: "Trip Edited Successfully" })

    } catch (err) {
        res.status(500).json({ err: true, msg: err })
        console.log(err)
    }
})


router.delete('/remove/:vacation_id', async (req, res) => {
    try {
        const vacationID = req.params.vacation_id
        
        const RemoveallFollowersFromVacation = `DELETE from followvacations WHERE vacation_id = ${vacationID}`
        await myQuery(RemoveallFollowersFromVacation)

        const q = `DELETE from vacations WHERE id = ${vacationID};`
        await myQuery(q)
        res.status(200).json({ err: false, msg: 'Trip Removed Successfully' })
    } catch (err) {
        res.status(500).json({ err: true, msg: err })
        console.log(err)
    }
})


router.get('/:user_id', VerifyUser, async (req, res) => {
    try {
        const user_id = req.params.user_id
        const vacationsQuary = `SELECT * from vacations ;`
        const vacations = await myQuery(vacationsQuary)

        const followedQuary = `SELECT * from followvacations WHERE user_id = "${user_id}";`
        const followed = await myQuery(followedQuary)

        const FollowIndexs = followed.map(a => a.vacation_id);

        vacations.forEach(vacation => {
            FollowIndexs.forEach(i => {
                if (vacation.id === i) {
                    vacation.checked = true
                }
            })
        });

        const withOutChecked = vacations.filter(v => !v.checked)
        const onlyChecked = vacations.filter(v => v.checked)
        const FinalRes = [...onlyChecked, ...withOutChecked]

        res.json(FinalRes)

    } catch (err) {
        console.log(err)
        res.json({ err })
    }
});

module.exports = router
