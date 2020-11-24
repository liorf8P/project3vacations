const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
require('./db')

dotenv.config()

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.use('/register', require('./Routes/Register'))
app.use('/login', require('./Routes/Login'))
app.use('/vacations', require('./Routes/Vacations'))
app.use('/followvecation', require('./Routes/FollowVecation'))



app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(PORT, () => console.log(`run on port ${PORT}`))


