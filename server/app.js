const express = require('express')
const cors = require('cors')
const path = require('path')
const { User } = require('./User')

const users = []

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(path.dirname(__dirname), 'public')))

const PORT = 3000

app.get('/accounts', (req, res) => {
	res.status(200).json(users)
})

app.post('/accounts', (req, res) => {
	users.push(new User(req.body.username, req.body.password))
	res.status(201).json(req.body)
})

app.listen(PORT, err => {
	err ? console.log(err) : console.log(`listening ${PORT}`)
})
