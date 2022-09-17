// // // TOGGLE HOME <-> PROFILE

//     const profile_btn = document.getElementById('profile-btn');
//     const main_feed = document.querySelector('.main-feed');
//     const profile_container = document.querySelector('.profile-container');
//     const main_flex = document.querySelector('.main-flex');
    
//     profile_btn.addEventListener('click', ()=>{

//         main_feed.style.display = 'none';
//         profile_container.style.display = 'flex';

//     });






// // ////
// const showAudienceToggleButton = document.querySelector('#publicity')
// const box = document.querySelector('#publicity-choices-js')
// //toggle the box of publicity choices
// showAudienceToggleButton.addEventListener('click', () => {
    
//     box.classList.toggle('none');
// })

// const privacy = document.querySelector('#privacy')

// const options = document.querySelectorAll('.publicity-choices__item')

// let private_option = document.querySelector('#privacy')

// //fill the hidden value with the choice and diplay check icon
// options.forEach((option) => {
//   option.addEventListener('click', () => {
//     if (private_option) {
//       if (option.id == 'public-choice') {
//         private_option.value = 1
//         document.querySelector('#private-check').classList.add('none')
//         document.querySelector('#public-check').style.display = 'block';
//         box.classList.toggle('none');
//         showAudienceToggleButton.innerHTML = 'Everyone <i class="material-icons-outlined">expand_more</i>';
//       } else {
//         private_option.value = 2
//         document.querySelector('#private-check').classList.remove('none')
//         document.querySelector('#public-check').style.display = 'none';
//         box.classList.toggle('none');
//         showAudienceToggleButton.innerHTML = 'Followers <i class="material-icons-outlined">expand_more</i>'
//       }
//     }
//   })
// })

/* Main JS */

let edit_profile_btn = document.getElementById('edit-profile');
let edit_popup = document.getElementById('edit-popup');
let close_profile_edit = document.getElementById('close-profile-edit');


edit_profile_btn.addEventListener('click', ()=>{
    edit_popup.style.display = 'block';

});

close_profile_edit.addEventListener('click', ()=>{
    edit_popup.style.display = 'none';
    
});

// ///////////
let new_profile_img = document.getElementById('new-profile-img');
let default_profile_img_btn = document.getElementById('default-profile-img-btn');

new_profile_img.addEventListener('click', ()=>{
    default_profile_img_btn.click();
});

default_profile_img_btn.addEventListener('change', function(){

    const file = this.files[0];

    if(file){

    const reader = new FileReader();
    reader.onload = function(){
        const result = reader.result;
        new_profile_img.src = result
    }
    reader.readAsDataURL(file);
    }
    
})

// ///////////
let new_profile_bg = document.getElementById('new-profile-bg');
let default_profile_bg_btn = document.getElementById('default-profile-bg-btn');

new_profile_bg.addEventListener('click', ()=>{
    default_profile_bg_btn.click();
});

default_profile_bg_btn.addEventListener('change', function(){

    const file = this.files[0];

    if(file){

    const reader = new FileReader();
    reader.onload = function(){
        const result = reader.result;
        new_profile_bg.src = result;
    }
    reader.readAsDataURL(file);
    }
    
});


