const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'liorp_project3'
})

con.connect((err) => {
    if (err) {
        console.log("error connection" + err.stack)
        return
    }
    console.log('connected to my sql')
})


const myQuery = (q) => {
    return new Promise((resolve, reject) => {
        con.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = myQuery