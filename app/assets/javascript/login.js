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
    signin_btn.click();
});


// Checking input validity
let inputs = Object.values(document.getElementsByClassName('input'));
let form_inputs = Object.values(document.getElementsByClassName('form-input'));
let name_input = document.getElementById('name-input');
let email_input = document.getElementById('email-input');
let name_length = document.getElementById('name-length');
let password_input = document.getElementById('password-input');
let password_input_confirmation= document.getElementById('password-input-confirmation');


    
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


    // Email validation
email_input.addEventListener('input',()=>{
    let email_list = email_input.value.split('');

    // spliting the email into two parts to check the length of each before and after the '@' sign
    let email_parts = email_input.value.split('@', 2);
    let is_email = false;

    // checking for the '@' sign
    email_list.forEach(element => {
        if(element == '@'){
            is_email = true;
            form_inputs[1].style.border = '1px solid rgb(0, 0, 0, .3)';
        }
    });

    if(!is_email){
        valid_input = false;
        form_inputs[1].style.border = '1px solid red';
    }else{

        
        if(email_parts[0].length < 3){
            valid_input = false;
            form_inputs[1].style.border = '1px solid red';
        }else{
            valid_input = true;
            form_inputs[1].style.border = '1px solid rgb(0, 0, 0, .3)';
        };

        if(email_parts[1].length <5){
            valid_input = false;
            form_inputs[1].style.border = '1px solid red';
        }else{
            valid_input = true;
            form_inputs[1].style.border = '1px solid rgb(0, 0, 0, .3)';
        };

    }

});

// PASSWORD STRENGTH
password_input.addEventListener('input', ()=>{

if(password_input.value.length >= 8){
    console.log('long')
}
if(password_input.value.match(/[A-Z]/)){
    console.log('Uppercase')
}
if(password_input.value.match(/[a-z]/)){
    console.log('lowercase');
}
if(password_input.value.match(/[0-9]/)){
    console.log('numbers');
}
if(password_input.value.match(/[\'^�$%&*()}{@#~?><>,|=_+�-]/)){
    console.log('special');
}

if(password_input.value.length >= 8 &&
    password_input.value.match(/[A-Z]/) &&
    password_input.value.match(/[a-z]/) &&
    password_input.value.match(/[0-9]/) &&
    password_input.value.match(/[\'^�$%&*()}{@#~?><>,|=_+�-]/)){
    console.log('STRONGGGGGG')
}



});



// SIGNIN INPUT VALIDATION
let signin_next_btn = document.getElementById('signin-next-btn');
let signin_input = document.getElementById('signin-input');
let signin_pass = document.getElementById('signin-pass');
let form_input = Object.values(document.getElementsByClassName('signin-input'));


signin_next_btn.addEventListener('click', (event)=>{

    form_input.forEach(element => {
        if(element.value.length <=0 ){
            event.preventDefault();
            element.style.border = '1px solid red'
        }else{
            element.style.border = '1px solid rgba(0, 0, 0, .3)'
        }
    });

});


// EMAIL - PHONE SWITCHER
// let email_phone_switch_btn  = document.getElementById('email-phone-switch-btn');
// let phone_input = document.getElementById('phone-input');
// let switcher = true;

// email_phone_switch_btn.addEventListener('click', (event)=>{
//     if(switcher){
//         switcher = false;
//     event.preventDefault();
//     email_input.style.display = 'none';
//     phone_input.style.display = 'flex';
//     }else{
//         switcher = true;
//         event.preventDefault();
//         email_input.style.display = 'flex';
//         phone_input.style.display = 'none';
//     }
    
// })
