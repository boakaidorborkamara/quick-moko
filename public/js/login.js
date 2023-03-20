let login_form = document.getElementById('login-form');
let momo_number = document.getElementById('momo-number');
let password = document.getElementById('password');
let login_result_box = document.getElementById('login-result-box');
// console.log(login_form, momo_number, password);
// console.log(login_result_box);


// save extracted data here 
let data = {};


//add functionality to submit btn 
login_form.addEventListener('submit', submitData);

// hide result area 
login_result_box.style.display = "none"

////////////////////////////////////////////////////////////////////////////////


// Extract data from form 
function getFrontEndData(event){
    
    // add login data to data object 
    data.mobile_money_number = momo_number.value;
    data.pin_code = password.value;

    return data;
}


//Submit frontend data to backend
function submitData(event){

    // remove default behavior of form 
    event.preventDefault();

    let data = getFrontEndData();

    console.log(data)

    let url = '/login';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        
        console.log("Data is returning")
        console.log(data);
        if(data.code === 0){
            window.location.href = data.redirectURL;
            return;
        }

        
        // // display error messages 
        login_result_box.innerHTML = data.message;
        
        login_result_box.style.display = "block";
            
        setTimeout(() => {
            login_result_box.style.display = "none";
        }, 4000);

    });
        
  
}