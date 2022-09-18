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
          id: data.user_data.id,
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

  let user_id

  console.log(user_id)
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
          id: data.user_data.id,
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

const logout = () => {
  localStorage.removeItem('user')
  changePage('index.html')
}

const changePage = (page_name) => {
  setTimeout(() => {
    return (window.location.href = base_url + '/app/views/' + page_name)
  }, 1500)
}

//if not logged in user ==> return to index
const authorizeUser = () => {
  // console.log(window.location.href)
  if (
    !localStorage.getItem('user') &&
    window.location.href != base_url + '/app/views/index.html'
  ) {
    changePage('index.html')
  } else if (
    localStorage.getItem('user') &&
    window.location.href == base_url + '/app/views/index.html'
  ) {
    changePage('home.html')
  }
}

const get_user_ID = (username) => {
  console.log(username)
  const user_id = fetch_api(api + 'get_user_id.php', { username: username })
    .then((data) => data)
    .catch((error) => console.log(error))

  console.log(user_id)

  return user_id
}

authorizeUser()
