// DECLARING CONSTANTS
const signup_btn = document.getElementById('signup-btn');
const form_body = document.getElementById('form-body');
const close_form = document.getElementById('close-form');
const submit_signup =  document.getElementById('submit-signup');
const form_page_1 = document.getElementById('form-page-1');
const signin_btn = document.getElementById('signin-btn');
const signin_form = document.getElementById('signin-form');
const signin_close_form = document.getElementById('signin-close-form');
const inner_signup_btn = document.getElementById('inner-signup-btn');


// ADDING FUNCTIONALITY TO THE FORM BUTTONS
signup_btn.addEventListener('click', ()=>{
    form_page_1.style.display = 'flex';
    document.body.append(form_page_1);
});

close_form.addEventListener('click', ()=>{
    form_page_1.remove();
});

submit_signup.addEventListener('click', ()=>{
    
    if(valid){
        // submit
    }

});


signin_btn.addEventListener('click', ()=>{
    signin_form.style.display = 'flex';
});

signin_close_form.addEventListener('click', ()=>{
    signin_form.style.display = 'none';
});

inner_signup_btn.addEventListener('click', ()=>{
    signin_form.style.display = 'none';
});