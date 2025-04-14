const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const controller = require('./controller')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', controller.createUser)
app.get('/api/users', controller.getUser)




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
