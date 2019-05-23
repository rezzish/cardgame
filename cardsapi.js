// cards api 5.21.2019

//the basics
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = 8080

// app.use(express.static('img'))

app.get('/', (req, res) => {
	res.json({ message: 'GET: Great job!' })
})
app.get('/shhh', (req, res) => {
	res.json({ message: 'Ohhh, spicy' })
})

//start the server
app.listen(port)
console.log("Doin' it well on port " + port)