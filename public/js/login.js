let login_form = document.getElementById('login-form');
let momo_number = document.getElementById('momo-number');
let password = document.getElementById('password');
console.log(login_form, momo_number, password);

// safe extracted data here 
let data = {};


login_form.addEventListener('submit', getFrontEndData);




function getFrontEndData(event){
    event.preventDefault();
    
    data.momo_number = momo_number.value;
    data.password = password.value;

    console.log(data);

    return data;
}