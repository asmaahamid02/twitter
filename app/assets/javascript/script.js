/* Main JS */
const edit_profile_btn = document.getElementById('edit-profile')
const edit_popup = document.getElementById('edit-popup')
const close_profile_edit = document.getElementById('close-profile-edit')

// Displaying edit form
edit_profile_btn.addEventListener('click', () => {
  edit_popup.style.display = 'block'
})

// Closing edit form
close_profile_edit.addEventListener('click', () => {
  edit_popup.style.display = 'none'
})

// Giving the custome button the functionality of the default button
const new_profile_img = document.getElementById('new-profile-img')
const default_profile_img_btn = document.getElementById(
  'default-profile-img-btn'
)

new_profile_img.addEventListener('click', () => {
  default_profile_img_btn.click()
})

default_profile_img_btn.addEventListener('change', function () {
  const file = this.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function () {
      const result = reader.result
      new_profile_img.src = result
    }
    reader.readAsDataURL(file)
  }
})

// Giving the custome button the functionality of the default button
let new_profile_bg = document.getElementById('new-profile-bg')
let default_profile_bg_btn = document.getElementById('default-profile-bg-btn')

new_profile_bg.addEventListener('click', () => {
  default_profile_bg_btn.click()
})

default_profile_bg_btn.addEventListener('change', function () {
  const file = this.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = function () {
      const result = reader.result
      new_profile_bg.src = result
    }
    reader.readAsDataURL(file)
  }
})

// CREATING NEW TWEET

function createTweet(
  tweet,
  tweet_picture,
  tweet_created_at,
  name,
  username,
  profile_image_path
) {
  // feed container
  let feed_container = document.getElementById('feed-container')

  let feed_tweet = document.createElement('div')
  feed_tweet.classList.add('feed-tweet')

  let profile_circle_img = document.createElement('img')
  profile_circle_img.classList.add('profile-circle-img')

  let tweet_details = document.createElement('div')
  tweet_details.classList.add('tweet-details')

  let tweet_account_details = document.createElement('div')
  tweet_account_details.classList.add('tweet-account-details')

  let user_details = document.createElement('a')
  user_details.classList.add('user-details')

  let tweet_username = document.createElement('span')

  let tweet_date = document.createElement('span')
  tweet_date.classList.add('tweet-date')

  let blue_icons_hovered = document.createElement('i')
  blue_icons_hovered.classList.add('blue_icons_hovered')
  blue_icons_hovered.classList.add('material-icons-outlined')

  let tweet_body = document.createElement('div')
  tweet_body.classList.add('tweet-body')

  let tweet_body_text = document.createElement('p')
  tweet_body_text.classList.add('tweet-body-text')

  // image-div
  let tweet_image = document.createElement('div')
  tweet_image.classList.add('tweet-image')

  // actual image
  let tweet_img = document.createElement('img')

  let tweet_icons = document.createElement('div')
  tweet_icons.classList.add('tweet-icons')

  let icon_item = document.createElement('a')
  icon_item.classList.add('icon-item')

  let likes_span = document.createElement('span')

  // INSERT DATA
  if(profile_image_path){
    profile_circle_img.src = profile_image_path;
  }else{
    profile_circle_img.src = '../assets/svg/ui-user-profile.svg'
  }
  user_details.innerHTML = name
  tweet_username.innerHTML = `@${username}`
  if (tweet_created_at) {
    tweet_date.innerHTML = filterDate(tweet_created_at)
  } else {
    tweet_date.innerHTML = tweet_created_at
  }
  blue_icons_hovered.innerHTML =
    '<i class="material-icons-outlined blue-icons-hovered">more_horiz</i>'
  tweet_body_text.innerHTML = tweet
  // tweet_img.src = tweet_picture;
  tweet_img.src = tweet_picture
  icon_item.innerHTML =
    '<i class="material-icons-outlined pink-icons-hovered">favorite_border</i>'
  likes_span.innerHTML = '420k'

  // APPENDING ELEMENTS INSIDE EACH OTHER
  feed_container.append(feed_tweet)
  feed_tweet.append(profile_circle_img, tweet_details)
  tweet_details.append(tweet_account_details, tweet_body, tweet_icons)
  tweet_account_details.append(user_details, tweet_date, blue_icons_hovered)
  user_details.append(tweet_username)
  tweet_body.append(tweet_body_text, tweet_image)
  // checking wether there is a picture before appending it
  if (tweet_picture) {
    tweet_image.append(tweet_img)
  }
  tweet_icons.append(icon_item)
  icon_item.append(likes_span)
}

// FETCH TWEETS DATA
let id = 1

function displayLoop(num) {
  for (let i = 0; i < num; i++) {
    fetch(`${api}get_user_tweets.php?id=${id}`)
      .then((res) => res.json())
      .then((data) =>
        createTweet(
          data[i].tweet,
          data[i].tweet_picture,
          data[i].created_at,
          data[i].name,
          data[i].username,
          data[i].profile_image_path
        )
      )
  }
}
// fetching tweets count seperately
fetch(`${api}get_user_tweets.php?id=${id}`)
  .then((res) => res.json())
  .then((data) => displayLoop(data.length))

// filtering whether to render year/month/day or not
function filterDate(tweet_created_at) {
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth() + 1).padStart(2, '0')
  let yyyy = today.getFullYear()

  let date = tweet_created_at.split(' ', 2)[0]
  let time = tweet_created_at.split(' ', 2)[1]
  if (yyyy == date.split('-', 3)[0]) {
    date = date.slice(date.split('-', 3)[0].length + 1)
    if (mm == date.split('-', 2)[0]) {
      date = date.slice(date.split('-', 2)[0].length + 1)
      if (dd == date) {
        date = date.slice(date.length)
        return `${date} ${time}`
      } else {
        return `${date} ${time}`
      }
    } else {
      return `${date} ${time}`
    }
  } else {
    return `${date} ${time}`
  }
  return `${date} ${time}`
}

// Fetching user's profile data
window.addEventListener('load', ()=>{

  fetch(`${api}get_user_data.php?id=${id}`)
  .then((res) => res.json())
  .then((data) => 
  // console.log(data)
  renderUserData(data.cover_image_path, data.profile_image_path, data.name, data.username,data.location, data.registered_at, data.follwing, data.follwers, data.Biography)
  )

});

function renderUserData(cover_image_path, profile_image_path, fetched_name, fetched_username,fetched_location, fetched_registered_at, fetched_follwing, fetched_follwers, fetched_biography){
  const bg_img = document.getElementById('bg-img');
  const profile_img = document.getElementById('profile-img');
  const name = document.getElementById('name');
  const username = document.getElementById('username');
  const location = document.getElementById('location');
  const joined_date = document.getElementById('joined-date');
  const follwing = document.getElementById('follwing');
  const follwers = document.getElementById('follwers');
  const biography = document.getElementById('biography');

  // removing time(hour & minute) from date
  fetched_registered_at = fetched_registered_at.slice(' ', 10);
  // Inserting data
  if(cover_image_path){
    bg_img.src = cover_image_path;
  }
    if(profile_image_path){
      profile_img.src = profile_image_path;
  }

  name.innerHTML = `${fetched_name}`;
  username.innerText = `@${fetched_username}`;
  joined_date.innerText = fetched_registered_at;
  if(fetched_location){
      location.innerHTML = `<i class="material-icons-outlined  location-icon">location_on</i>${fetched_location}`;
  }

  if(fetched_follwing){
      follwing.innerText = fetched_follwing;

  }
    if(fetched_follwers){
      follwers.innerText = fetched_follwers;
  }
  biography.innerText = fetched_biography;

}