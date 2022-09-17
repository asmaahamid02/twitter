const base_url =
  window.location.protocol + '//' + window.location.host + '/twitter'
const api = base_url + '/backend/apis/'

const fetch_api = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: new URLSearchParams(data),
  })
  return response.json()
}

const login = () => {
  if (localStorage.getItem('user')) {
    return
  }
  const email_username = document.querySelector('#signin-input')
  const password = document.querySelector('#signin-pass')

  const data_obj = {
    email_username: email_username.value,
    password: password.value,
  }
  fetch_api(api + 'login.php', data_obj)
    .then((data) => {
      if (data.success) {
        const user = {
          username: data.user_data.username,
          email: data.user_data.email,
          password: data.user_data.password,
        }
        localStorage.setItem('user', JSON.stringify(user))
        console.log(data.success)
        changePage('home.html')
        //   console.log('true', data)
      } else {
        console.log(data.error ? data.error : data.empty)
      }
    })
    .catch((error) => console.log(error))
}

const signup = () => {
  const full_name = document.querySelector('#name-input')
  const email = document.querySelector('#email-input')
  const password = document.querySelector('#password-input')
  const month = document.querySelector('#month')
  const day = document.querySelector('#day')
  const year = document.querySelector('#year')

  const date_of_birth = `${year.value}-${month.value}-${day.value}`

  const data_obj = {
    full_name: full_name.value,
    email: email.value,
    date_of_birth: date_of_birth,
    password: password.value,
  }

  fetch_api(api + 'register.php', data_obj)
    .then((data) => {
      // console.log(data)
      if (data.success) {
        const user = {
          username: data.user_data.username,
          email: data.user_data.email,
          password: data.user_data.password,
        }
        localStorage.setItem('user', JSON.stringify(user))
        console.log(data.success)
        changePage('home.html')
        // console.log('true', data)
      } else {
        console.log(data.error ? data.error : data.empty)
      }
    })
    .catch((error) => console.log(error))
}

const changePage = (page_name) => {
  setTimeout(() => {
    return (window.location.href = base_url + '/app/views/' + page_name)
  }, 1500)
}

//if not logged in user ==> return to index
const authorizeUser = () => {
  if (
    !localStorage.getItem('user') &&
    window.location.href != base_url + '/app/views/index.html'
  ) {
    changePage('index.html')
  }
}

authorizeUser()
