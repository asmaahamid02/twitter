const tweet_form = document.querySelector('.create-tweet')
const tweet_img = document.querySelector('#tweet-img-input')
const trigger_img = document.querySelector('#trigger-img')
let img_file

tweet_img.addEventListener('change', (e) => {
  img_file = e.target.files[0]
})

trigger_img.addEventListener('click', () => {
  tweet_img.click()
})

const create_tweet = (data_obj) => {
  let base64URL = ''

  const reader = convert_image_to_base64(img_file)
  reader.addEventListener('load', () => {
    base64URL = reader.result // .replace('data:', '').replace(/^.+,/, '') //remove the data identifier
    // console.log(base64URL)
    data_obj['picture'] = base64URL

    fetch_api(api + 'create_tweet.php', data_obj)
      .then((data) => {
        console.log(data)
        if (data.success) {
          console.log(data.success)
        } else {
          console.log(data.error ? data.error : data.empty)
        }
      })
      .catch((error) => console.log(error))
  })
}

tweet_form.addEventListener('submit', (e) => {
  e.preventDefault()
  const publicity_option = document.querySelector('#privacy')

  const tweet_text = document.querySelector('#tweet-text')

  let data_obj = {
    username: JSON.parse(localStorage.getItem('user')).username,
    tweet: tweet_text.value,
    publicity: publicity_option.value,
  }

  // console.log(img_file)

  create_tweet(data_obj)
})
