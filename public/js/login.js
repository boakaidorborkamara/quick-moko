let login_form = document.getElementById('login-form');
let momo_number = document.getElementById('momo-number');
let password = document.getElementById('password');
console.log(login_form, momo_number, password);


// save extracted data here 
let data = {};


//add functionality to submit btn 
login_form.addEventListener('submit', submitData);



////////////////////////////////////////////////////////////////////////////////


// Extract data from form 
function getFrontEndData(event){
    
    // add login data to data object 
    data.momo_number = momo_number.value;
    data.password = password.value;

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
        
        console.log(data);
          if(data.code === 0){
            window.location.href = "/dashboard";
          }
    });
        
  
}