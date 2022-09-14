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
        new_profile_bg.src = result
    }
    reader.readAsDataURL(file);
    }
    
})