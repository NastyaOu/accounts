const usernameRegExp = /^[а-яА-ЯёЁa-zA-Z0-9]+$/
const passwordRegExp =
	/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/g

let url = new URL(window.location)
url = url.origin

document.addEventListener('DOMContentLoaded', () => {
	const usernameInput = document.querySelector('#username')
	const passwordInput = document.querySelector('#password')
	const form = document.querySelector('form')
	const errorElement = document.querySelector('#error')
	let error = true
	form.addEventListener('submit', event => {
		event.preventDefault()

		if (usernameInput.value.length === 0 || passwordInput.value.length === 0)
			error = true

		if (error) {
			errorElement.innerHTML = 'Заполните поля'
			return
		}

		const body = JSON.stringify({
			username: usernameInput.value,
			password: passwordInput.value,
		})

		fetch(url + '/accounts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body,
		})

		usernameInput.value = ''
		passwordInput.value = ''
	})

	usernameInput.addEventListener('input', () => {
		const value = usernameInput.value
		if (value.length < 4 || value.length > 16) {
			errorElement.innerHTML =
				'Длина логина должна составлять от 4 до 16 символов'
			error = true
			return
		}

		if (!usernameRegExp.test(value)) {
			errorElement.innerHTML = 'Логин не должен содержать специальных символов'
			error = true
			return
		}

		errorElement.innerHTML = ''
		error = false
	})

	passwordInput.addEventListener('input', () => {
		const value = passwordInput.value
		if (value.length < 4 || value.length > 16) {
			errorElement.innerHTML =
				'Длина пароля должна составлять от 4 до 16 символов'
			error = true
			return
		}

		if (!passwordRegExp.test(value)) {
			errorElement.innerHTML = `Пароль должен состоять из латинских символов и включать: <br>
       - Хотя бы один символ в верхнем регистре <br>
       - Хотя бы один символ в нижнем регистре <br>
       - Хотя бы одно число <br>
       - Хотя бы один спецсимвол`
			error = true
			return
		}

		errorElement.innerHTML = ''
		error = false
	})
})
