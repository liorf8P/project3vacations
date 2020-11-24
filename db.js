
const mysql =  = mysql.createPool({
  connectionLimit : 100,
  host            : 'eu-cdbr-west-03.cleardb.net',
  user            : 'b6a264fdd23f8c',
  password        : '848c23b5',
  database        : 'heroku_59a591344fd601f'
});

pool.query('SELECT * FROM vacations;', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

// con.connect((err) => {
//     if (err) {
//         console.log("error connection" + err.stack)
//         return
//     }
//     console.log('connected to my sql!@!@!@!!@!@!@!@!@!@!@!!@!@!!@!!!@!@!!@')
// })


const myQuery = (q) => {
    return new Promise((resolve, reject) => {
        pool.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = myQuery
