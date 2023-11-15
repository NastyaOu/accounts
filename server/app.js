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
	const usernameRegExp = /^[а-яА-ЯёЁa-zA-Z0-9]+$/
	const passwordRegExp =
		/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/g

	if (!req.body.username) {
		res.status(400).json('Не хватает логина')
		return
	}
	const username = req.body.username

	if (username.length < 4 || username.length > 16) {
		res.status(400).json('Длина логина должна составлять от 4 до 16 символов')
		return
	}

	if (!usernameRegExp.test(username)) {
		res.status(400).json('Логин не должен содержать специальных символов')

		return
	}

	if (!req.body.password) {
		res.status(400).json('Не хватает пароля')
		return
	}
	const password = req.body.password

	if (password.length < 4 || password.length > 16) {
		res.status(400).json('Длина пароля должна составлять от 4 до 16 символов')
		return
	}

	if (!passwordRegExp.test(password)) {
		res.status(400)
			.json(`Пароль должен состоять из латинских символов и включать:
       - Хотя бы один символ в верхнем регистре
       - Хотя бы один символ в нижнем регистре
       - Хотя бы одно число
       - Хотя бы один спецсимвол`)

		return
	}

	users.push(new User(req.body.username, req.body.password))
	res.status(201).json(req.body)
})

app.listen(PORT, err => {
	err ? console.log(err) : console.log(`listening ${PORT}`)
})
