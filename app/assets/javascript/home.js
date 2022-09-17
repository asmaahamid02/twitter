// // TOGGLE HOME <-> PROFILE

    const profile_btn = document.getElementById('profile-btn');
    const main_feed = document.querySelector('.main-feed');
    const profile_container = document.querySelector('.profile-container');
    const main_flex = document.querySelector('.main-flex');
    
    profile_btn.addEventListener('click', ()=>{

        main_feed.style.display = 'none';
        profile_container.style.display = 'flex';

    });


// ////
const showAudienceToggleButton = document.querySelector('#publicity')
const box = document.querySelector('#publicity-choices-js')
//toggle the box of publicity choices
showAudienceToggleButton.addEventListener('click', () => {
    
    box.classList.toggle('none');
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
        document.querySelector('#public-check').style.display = 'block';
        box.classList.toggle('none');
        showAudienceToggleButton.innerHTML = 'Everyone <i class="material-icons-outlined">expand_more</i>';
      } else {
        private_option.value = 2
        document.querySelector('#private-check').classList.remove('none')
        document.querySelector('#public-check').style.display = 'none';
        box.classList.toggle('none');
        showAudienceToggleButton.innerHTML = 'Followers <i class="material-icons-outlined">expand_more</i>'
      }
    }
  })
})

// CREATING NEW TWEET
window.addEventListener('load', createTweet());


function createTweet(){
// feed container
let feed_container = document.getElementById('feed-container');
  // tweet div
  let feed_tweet = document.createElement('div');
  feed_tweet.classList.add('feed-tweet');

  let profile_circle_img =  document.createElement('img');
  profile_circle_img.classList.add('profile-circle-img');

  let tweet_details = document.createElement('div');
  tweet_details.classList.add('tweet-details');

  let tweet_account_details = document.createElement('div');
  tweet_account_details.classList.add('tweet-account-details');

  let user_details = document.createElement('a');
  user_details.classList.add('user-details');

  let tweet_username = document.createElement('span'); 

  let tweet_date = document.createElement('span');
  tweet_date.classList.add('tweet-date');

  let blue_icons_hovered = document.createElement('i');
  blue_icons_hovered.classList.add('blue_icons_hovered');
  blue_icons_hovered.classList.add('material-icons-outlined');

  let tweet_body = document.createElement('div');
  tweet_body.classList.add('tweet-body');

  let tweet_body_text = document.createElement('p');
  tweet_body_text.classList.add('tweet-body-text');

  // image-div
  let tweet_image = document.createElement('div');
  tweet_image.classList.add('tweet-image');

  // actual image
  let tweet_img = document.createElement('img');

  let tweet_icons = document.createElement('div');
  tweet_icons.classList.add('tweet-icons');

  let icon_item = document.createElement('a');
  icon_item.classList.add('icon-item');

  let pink_icons_hovered = document.createElement('i');
  pink_icons_hovered.classList.add('material-icons-outlined','pink-icons-hovered');

  let likes_span = document.createElement('span');


  // INSERT DATA
  profile_circle_img.src = '/app/assets/svg/ui-user-profile.svg';
  user_details.innerHTML = 'Firas';
  tweet_username.innerHTML = '@phoenix89';
  tweet_date.innerHTML = '2h';
  blue_icons_hovered.innerHTML = '...';
  tweet_body_text.innerHTML = 'Hello world, This is my first tweet.'
  tweet_img.src = '/app/assets/images/google-logo.png';
  likes_span.innerHTML = '420k';



  // APPENDING ELEMENTS INSIDE EACH OTHER 
  feed_container.append(feed_tweet);
  feed_tweet.append(profile_circle_img, tweet_details);
  tweet_details.append(tweet_account_details, tweet_body, tweet_icons);
  tweet_account_details.append(user_details, tweet_date, blue_icons_hovered);
  user_details.append(tweet_username)
  tweet_body.append(tweet_body_text, tweet_image);
  tweet_image.append(tweet_img);
  tweet_icons.append(icon_item, pink_icons_hovered);
  icon_item.append(likes_span)

};


