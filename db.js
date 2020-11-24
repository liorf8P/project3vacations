const mysql = require('mysql')





var pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'liorp_project3'
});

pool.getConnection(function(err, connection) {
    connection.query( 'SELECT something FROM sometable', function(err, rows) {

      console.log(pool._freeConnections.indexOf(connection)); // -1

      connection.release();

      console.log(pool._freeConnections.indexOf(connection)); // 0

   });
});

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'liorp_project3'
// })

// con.connect((err) => {
//     if (err) {
//         console.log("error connection" + err.stack)
//         return
//     }
//     console.log('connected to my sql')
// })


const myQuery = (q) => {
    return new Promise((resolve, reject) => {
        con.pool(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = myQuery
