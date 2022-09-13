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
var valid_input = false;

// ADDING FUNCTIONALITY TO THE FORM BUTTONS
signup_btn.addEventListener('click', ()=>{
    form_page_1.style.display = 'flex';
    document.body.append(form_page_1);
});

close_form.addEventListener('click', ()=>{
    form_page_1.remove();
});

submit_signup.addEventListener('click', (event)=>{
    
    if(valid_input){
        console.log(valid_input);
    }else{
        console.log(valid_input);
        event.preventDefault();
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


// Checking input validity
let inputs = Object.values(document.getElementsByClassName('input'));
let form_inputs = Object.values(document.getElementsByClassName('form-input'));
let name_input = document.getElementById('name-input');
let email_input = document.getElementById('email-input');
let name_length = document.getElementById('name-length');


    
    name_input.addEventListener('input',()=>{

    if((name_input.value).length >= 40 || (name_input.value).length < 1){

        name_length.style.color = 'red';
        form_inputs[0].style.border = '1px solid red';
        submit_signup.classList.remove('submit_enabled');
        valid_input = false;

    }else{

        name_length.innerHTML = `${(name_input.value).length}/40`;
        name_length.style.color = 'black';
        form_inputs[0].style.border = '1px solid rgba(0, 0, 0, .3)';
        valid_input = true;

    };
});
