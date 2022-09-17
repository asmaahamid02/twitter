const base_url =
  window.location.protocol + '//' + window.location.host + '/twitter'
const api = base_url + '/backend/apis/'

const signup_fetch = async (data) => {
  const response = await fetch(api + 'register.php', {
    method: 'POST',
    body: new URLSearchParams(data),
  })
  return response.json()
}

// const changeView = () => {
//     const user = JSON.stringify(localStorage.getItem('user'))
//     if(user){

//     }
//         signup_btn.addEventListener('click', ()=>{
//         form_page_1.style.display = 'flex';
//         document.body.append(form_page_1);
//     });
// }

const signup = () => {
  const signup_form = document.querySelector('#form-page-1')

  signup_form.addEventListener('submit', (e) => {
    e.preventDefault()

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

    signup_fetch(data_obj)
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
          //   console.log('true', data)
        } else {
          console.log(data.error)
        }
      })
      .catch((error) => console.log(error))

    // resp = signup_fetch()
    // console.log(signup_form.elements[1])
  })
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
