// // TOGGLE HOME <-> PROFILE

const profile_btn = document.getElementById('profile-btn')
const main_feed = document.querySelector('.main-feed')
const profile_container = document.querySelector('.profile-container')
const main_flex = document.querySelector('.main-flex')

profile_btn.addEventListener('click', () => {
  main_feed.style.display = 'none'
  profile_container.style.display = 'flex'
})

// ////
const showAudienceToggleButton = document.querySelector('#publicity')
const box = document.querySelector('#publicity-choices-js')
//toggle the box of publicity choices
showAudienceToggleButton.addEventListener('click', () => {
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
        box.classList.toggle('none')
        showAudienceToggleButton.innerHTML =
          'Everyone <i class="material-icons-outlined">expand_more</i>'
      } else {
        private_option.value = 0
        document.querySelector('#private-check').classList.remove('none')
        document.querySelector('#public-check').style.display = 'none'
        box.classList.toggle('none')
        showAudienceToggleButton.innerHTML =
          'Followers <i class="material-icons-outlined">expand_more</i>'
      };
    };
  });
});

window.addEventListener('load', () => {
  //Fill a tags links
  const links = document.querySelectorAll('.nav-links > a')
  let user_id = JSON.parse(localStorage.getItem('user')).id

  links.forEach((link) => {
    // console.log(link.children[0])
    const page_name = link.children[0].textContent
    // console.log(page_name)
    if (page_name === '' || page_name === null || page_name === 'home') {
      link.href = `${base_url}/app/views/home.html`
    } else if (page_name === 'person') {
      link.href = `${base_url}/app/views/profile.html?id=${user_id}`
    } else if (page_name === 'search') {
      link.href = `${base_url}/app/views/search.html`
    };
  });
});

  // CREATING NEW TWEET
  // window.addEventListener('load', createTweet());

  function createTweet(
    tweet,
    tweet_picture,
    tweet_created_at,
    name,
    username,
    profile_image_path,
    user_id,
    likes
  ) {
    // feed container
    let feed_container = document.getElementById('feed-container');

    let feed_tweet = document.createElement('div');
    feed_tweet.classList.add('feed-tweet');

    let profile_circle_img = document.createElement('img');
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

    let likes_span = document.createElement('span');

  // INSERT DATA
  if(profile_image_path){
    profile_circle_img.src = profile_image_path;
  }else{
    profile_circle_img.src = '../assets/svg/ui-user-profile.svg';
  }
  user_details.innerHTML = name
    user_details.href = `${base_url}/app/views/profile.html?id=${user_id}`;
    tweet_username.innerHTML = `@${username}`;
    if (tweet_created_at) {
      tweet_date.innerHTML = filterDate(tweet_created_at);
    } else {
      tweet_date.innerHTML = tweet_created_at;
    }
    likes_span.innerHTML = likes ? likes : 0;
    blue_icons_hovered.innerHTML ='<i class="material-icons-outlined blue-icons-hovered">more_horiz</i>';
    tweet_body_text.innerHTML = tweet;

    tweet_img.src = tweet_picture;
    icon_item.innerHTML = '<i class="material-icons-outlined pink-icons-hovered">favorite_border</i>';

    // APPENDING ELEMENTS INSIDE EACH OTHER
    feed_container.append(feed_tweet);
    feed_tweet.append(profile_circle_img, tweet_details);
    tweet_details.append(tweet_account_details, tweet_body, tweet_icons);
    tweet_account_details.append(user_details, tweet_date, blue_icons_hovered);
    user_details.append(tweet_username);
    tweet_body.append(tweet_body_text, tweet_image);
    // checking wether there is a picture before appending it
    if (tweet_picture) {
      tweet_image.append(tweet_img);
    }

    tweet_icons.append(icon_item, likes_span);

  }

  // FETCH TWEETS DATA
  let id = 1;

  function displayLoop(num) {
    for (let i = 0; i < num; i++) {
      fetch(`${api}get_all_tweets.php?id=${id}`)
        .then((res) => res.json())
        .then((data) =>
          createTweet(
            data.tweets_info[i].tweet,
            data.tweets_info[i].tweet_picture,
            data.tweets_info[i].created_at,
            data.tweets_info[i].name,
            data.tweets_info[i].username,
            data.tweets_info[i].profile_image_path,
            data.tweets_info[i].user_id,
            data.tweets_info[i].likes
          )

        )
    };
  };

// fetching tweets count seperately
fetch(`${api}get_all_tweets.php?id=${id}`)
  .then((res) => res.json())
  .then((data) => displayLoop(data.num));


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
  };
};

// CREATING PROFILES & RENDERING THEM IN THE SIDE SECTION
function createProfileToFollow(name, username, profile_img){
  let people_follow = document.querySelector('.people-follow');

  let follow_profile = document.createElement('div');
  follow_profile.classList.add('follow-profile');

  let follow_cont = document.createElement('div');
  follow_cont.classList.add('follow-cont');

  let follow_cont_img = document.createElement('div');
  follow_cont_img.classList.add('follow-cont-img');

  let profile_circle_img = document.createElement('img');
  profile_circle_img.classList.add('profile-circle-img');

  let follow_details = document.createElement('div');
  follow_details.classList.add('follow-details');

  let name_link = document.createElement('a');
  name_link.classList.add('dotted-overflow');

  let username_span = document.createElement('span');
  username_span.classList.add('dotted-overflow');

  let btn_cont = document.createElement('div');
  btn_cont.classList.add('btn-cont');

  let follow_btn = document.createElement('button');
  follow_btn.classList.add('follow-btn');
  follow_btn.classList.add('btn');

  // INSERTING VALUES
  name_link.innerHTML = name;
  username_span.innerHTML = username;
  if(profile_img){
    profile_circle_img.src= profile_img;
  }else{
    profile_circle_img.src= '../assets/svg/ui-user-profile.svg';
  }
  
  follow_btn.innerHTML = 'Follow';

  // APPENDING ELEMENTS 
  people_follow.append(follow_profile);
  follow_profile.append(follow_cont, btn_cont);
  follow_cont.append(follow_cont_img,follow_details);
  follow_cont_img.append(profile_circle_img);
  follow_details.append(name_link, username_span);
  btn_cont.append(follow_btn);
}

// FETCHING DATA

  function profilesToFollowLoop(num){
    for (let i = 0; i < num; i++) {
  fetch(`${api}get_random_users.php?id=${id}`)
  .then((res) => res.json())
  .then((data) => 
      createProfileToFollow(data[i].name,
                            data[i].username,
                            data[i].profile_image_path)
      );
    };
  };

// fetching users count

    fetch(`${api}get_random_users.php?id=${id}`)
  .then((res) => res.json())
  .then((data) => 
    profilesToFollowLoop(data.length)
  );

// implementing sub profile
// Fetching user's profile data
window.addEventListener('load', ()=>{

  fetch(`${api}get_user_data.php?id=${id}`)
  .then((res) => res.json())
  .then((data) => 
  renderUserData(data.profile_image_path, data.name, data.username)
  )
});


function renderUserData(profile_image_path, fetched_name, fetched_username){

  const profile_img = document.getElementById('sub-profile-img');
  const name = document.getElementById('sub-profile-name');
  const username = document.getElementById('sub-profile-username');

  if(profile_image_path){
    profile_img.src = profile_image_path;
  }
  name.innerText = fetched_name;
  username.innerText = `@${fetched_username}`;
}

// NEW TWEET FUNCTIONALITY
const nav_tweet_button = document.querySelector('.nav-tweet-button');
const new_tweet = document.querySelector('.new-tweet');

nav_tweet_button.addEventListener('click', ()=>{
  new_tweet.style.display = 'flex';
})


// LIKING FUNCTIONALITY
    // function enableLiking(icon_item, likes_span){
    //   icon_item.add
    // }