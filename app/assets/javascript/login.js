// DECLARING CONSTANTS
const signup_btn = document.getElementById('signup-btn')
const form_body = document.getElementById('form-body')
const close_form = document.getElementById('close-form')
const submit_signup = document.getElementById('submit-signup')
const form_page_1 = document.getElementById('form-page-1')
const signin_btn = document.getElementById('signin-btn')
const signin_form = document.getElementById('signin-form')
const signin_close_form = document.getElementById('signin-close-form')
const inner_signup_btn = document.getElementById('inner-signup-btn')
var valid_name = false
var valid_email = false
var valid_password = false
var valid_confirmed_password = false
var valid_date = false

// ADDING FUNCTIONALITY TO THE FORM BUTTONS
signup_btn.addEventListener('click', () => {
  form_page_1.style.display = 'flex'
  document.body.append(form_page_1)
})

close_form.addEventListener('click', () => {
  form_page_1.remove()
})

// submit_signup.addEventListener('click', (event) => {})

form_page_1.addEventListener('submit', (e) => {
  e.preventDefault()
  if (valid_name && valid_email && valid_password && valid_confirmed_password) {
    // form submit
    signup()
  } else {
    return
  }
})

signin_btn.addEventListener('click', () => {
  signin_form.style.display = 'flex'
})

signin_close_form.addEventListener('click', () => {
  signin_form.style.display = 'none'
})

inner_signup_btn.addEventListener('click', () => {
  signin_btn.click()
})

// Checking input validity
let inputs = Object.values(document.getElementsByClassName('input'))
let form_inputs = Object.values(document.getElementsByClassName('form-input'))
let name_input = document.getElementById('name-input')
let email_input = document.getElementById('email-input')
let name_length = document.getElementById('name-length')
let password_input = document.getElementById('password-input')
let password_input_confirmation = document.getElementById(
  'password-input-confirmation'
)
let password_error = document.getElementById('password-error')
let password_confirmation_error = document.getElementById(
  'password-confirmation-error'
)
password_error.style.color = 'red'
password_confirmation_error.style.color = 'red'

//NAME VALIDATION
name_input.addEventListener('input', () => {
  if (name_input.value.length >= 40 || name_input.value.length < 1) {
    name_length.style.color = 'red'
    form_inputs[0].style.border = '1px solid red'
    submit_signup.classList.remove('submit_enabled')
    valid_name = false
  } else {
    name_length.innerHTML = `${name_input.value.length}/40`
    name_length.style.color = 'black'
    form_inputs[0].style.border = '1px solid rgba(0, 0, 0, .3)'
    valid_name = true
  }
})

// Email validation
email_input.addEventListener('input', () => {
  let email_list = email_input.value.split('')

  // spliting the email into two parts to check the length of each before and after the '@' sign
  let email_parts = email_input.value.split('@', 2)
  let is_email = false

  // checking for the '@' sign
  email_list.forEach((element) => {
    if (element == '@') {
      is_email = true
      form_inputs[1].style.border = '1px solid rgb(0, 0, 0, .3)'
    }
  })

  if (!is_email) {
    valid_email = false
    form_inputs[1].style.border = '1px solid red'
  } else {
    if (email_parts[0].length < 3) {
      form_inputs[1].style.border = '1px solid red'
      valid_email = false
    } else {
      valid_email = true
      form_inputs[1].style.border = '1px solid rgb(0, 0, 0, .3)'
    }

    if (email_parts[1].length < 5) {
      valid_email = false
      form_inputs[1].style.border = '1px solid red'
    } else {
      valid_email = true
      form_inputs[1].style.border = '1px solid rgb(0, 0, 0, .3)'
    }
  }
})

// PASSWORD STRENGTH
password_input.addEventListener('input', () => {
  if (password_input.value.length <= 8) {
    form_inputs[2].style.border = '1px solid red'
    password_error.innerHTML =
      'Error: password is too short. (min 8 characters) <br><br>'
  }
  if (!password_input.value.match(/[A-Z]/)) {
    form_inputs[2].style.border = '1px solid red'
    password_error.innerHTML = 'Error: include Uppercase. (A-Z) <br><br>'
  }
  if (!password_input.value.match(/[a-z]/)) {
    form_inputs[2].style.border = '1px solid red'
    password_error.innerHTML = 'Error: include Lowerercase. (a-z) <br><br>'
  }
  if (!password_input.value.match(/[0-9]/)) {
    form_inputs[2].style.border = '1px solid red'
    password_error.innerHTML = 'Error: include Numbers. (0-9) <br><br>'
  }
  if (!password_input.value.match(/[\'^�$%&*()}{@#~?><>,|=_+�-]/)) {
    form_inputs[2].style.border = '1px solid red'
    password_error.innerHTML =
      "Error: include Special Characters. (['^�$%&*()}{@#~?><>,|=_+�-]) <br><br>"
  }

  if (
    password_input.value.length >= 8 &&
    password_input.value.match(/[A-Z]/) &&
    password_input.value.match(/[a-z]/) &&
    password_input.value.match(/[0-9]/) &&
    password_input.value.match(/[\'^�$%&*()}{@#~?><>,|=_+�-]/)
  ) {
    form_inputs[2].style.border = '1px solid rgba(0, 0, 0, .3)'
    password_error.innerHTML = 'Strong password. <br><br>'
    password_error.style.color = 'green'
    valid_password = true
  } else {
    password_error.style.color = 'red'
    valid_password = false
  }
})

password_input_confirmation.addEventListener('input', () => {
  if (password_input_confirmation.value != password_input.value) {
    form_inputs[3].style.border = '1px solid red'
    password_confirmation_error.innerHTML =
      "Error: passwords don't match! <br><br>"
    password_confirmation_error.style.color = 'red'
    valid_confirmed_password = false
  } else {
    form_inputs[3].style.border = '1px solid rgba(0, 0, 0, .3)'
    password_confirmation_error.innerHTML = 'Confirmed <br><br>'
    password_confirmation_error.style.color = 'green'
    valid_confirmed_password = true
  }
})

// SIGNIN INPUT VALIDATION
let signin_next_btn = document.getElementById('signin-next-btn')
let signin_input = document.getElementById('signin-input')
let signin_pass = document.getElementById('signin-pass')
let form_input = Object.values(document.getElementsByClassName('signin-input'))

// signin_next_btn.addEventListener('click', (event) => {
//   event.preventDefault()
//   form_input.forEach((element) => {
//     if (element.value.length <= 0) {
//       event.preventDefault()
//       element.style.border = '1px solid red'
//       return
//     } else {
//       element.style.border = '1px solid rgba(0, 0, 0, .3)'
//     }
//   })
// })

signin_form.addEventListener('submit', (e) => {
  e.preventDefault()
  let empty = false
  form_input.forEach((element) => {
    if (element.value.length <= 0) {
      element.style.border = '1px solid red'
      empty = true
    } else {
      element.style.border = '1px solid rgba(0, 0, 0, .3)'
    }
  })

  if (!empty) {
    login()
  }
})

// EMAIL - PHONE SWITCHER
// let email_phone_switch_btn  = document.getElementById('email-phone-switch-btn');
// let phone_input = document.getElementById('phone-input');
// let switcher = true;

// email_phone_switch_btn.addEventListener('click', (event)=>{
//     if(switcher){
//         switcher = false;
//     event.preventDefault();
//     email_input.style.display = 'none';
//     phone_input.style.display = 'flex';
//     }else{
//         switcher = true;
//         event.preventDefault();
//         email_input.style.display = 'flex';
//         phone_input.style.display = 'none';
//     }

// })
