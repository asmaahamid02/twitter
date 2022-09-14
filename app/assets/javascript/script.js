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