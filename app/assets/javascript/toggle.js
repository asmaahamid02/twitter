const showAudienceToggleButton = document.querySelector('#publicity')

//toggle the box of publicity choices
showAudienceToggleButton.addEventListener('click', () => {
  const box = document.querySelector('#publicity-choices-js')
  box.classList.toggle('none')
})

const privacy = document.querySelector('#privacy')

const options = document.querySelectorAll('.publicity-choices__item')

let private_option = document.querySelector('#privacy')

//fill the hidden value with the choice and diplay check icon
options.forEach((option) => {
  option.addEventListener('click', () => {
    if (private_option) {
      if (option.id == 'public-choice') {
        private_option.value = 1

        document.querySelector('#private-check').classList.add('none')
        document.querySelector('#public-check').style.display = 'block'
      } else {
        private_option.value = 2
        document.querySelector('#private-check').classList.remove('none')
        document.querySelector('#public-check').style.display = 'none'
      }
    }
  })
})
