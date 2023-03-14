// form 
let registration_form = document.getElementById('registration-form');

// form header 
let form_header = document.getElementById("form-header");
let form_body_copy = document.getElementById('form-body-copy');

// Personal Details fields 
let first_name = document.getElementById('first-name');
let middle_name = document.getElementById('middle-name');
let last_name = document.getElementById('last-name');

// mobile money details 
let mobile_money_number = document.getElementById('mobile-money-number');
let verify_mobile_money_number = document.getElementById('otp-code');


// submit btn 
let btn = document.getElementById('registration-btn');


// control steps 
let get_started_completed = false;
let get_mobile_money_details_completed = false;



//Will save extracted data here
let data = {};


//implement submission of data when registration btn is clicked
registration_form.addEventListener('submit', (e)=>{

    e.preventDefault();

    data.first_name = first_name.value;
    data.middle_name = middle_name.value;
    data.last_name = last_name.value;
    get_started_completed = true;

    if(get_started_completed === true){

        // change form header details
        form_header.innerText = "Mobile Money Details";
        form_body_copy.innerText = "This should be an active Money Number register in your name. \n You will receive an OTP to your phone via sms."

        // change dom elements 
        hideElements(first_name, middle_name, last_name);
        showElements(mobile_money_number);
    }

});


//////////////////////////////////////////////////////////////


// extract data from the form and sanitize it 
function getFrontEndData (){

    // extract values from field and add it to data object 
    data.first_name = first_name.value;
    data.middle_name = middle_name.value;
    data.last_name = last_name.value;


    return data;

};


/////////////////////////////////////////////////////////////


//send data to backend api
function sendDataToBackEnd(event){

    // prevent form default behaviour
    event.preventDefault();


    // get data frontend data 
    let frontend_data = getFrontEndData();
    console.log('FRONTEND DATA', frontend_data);

    let url = '/register';
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(frontend_data)
    })
    .then((response) => response.json())
    .then((data) => {
    console.log('DATA', data)


    // scroll at the top of the page to show result alert 
    window.scrollTo(0,0);


    // check if the result data returns
    if(data){

        if(data.code === 0){

           //display result div with positive result
            result_area.innerHTML = data.message;
        
            result_area.style.display = "block";
            
            setTimeout(() => {
                result_area.style.display = "none";
                window.location.href = "/";
            }, 5000);

            return;
        }
        else{

            //display result div with negative
            result_area.removeAttribute("class", "alert-success");
            result_area.setAttribute("class", "alert-danger");
            result_area.style.padding = "20px 10px 20px 30px";
            result_area.style.marginBottom = "20px"
            result_area.innerHTML = data.message;
        
            result_area.style.display = "block";
            
            setTimeout(() => {
                result_area.style.display = "none";
            }, 5000);

            
        }
        
        
        return;
    }

    // result_content.innerHTML = "Error, try again";
    
  });

}


function hideElements(...arg){
    console.log(arg);
    arg.forEach(ele=>{
        console.log(ele);
        ele.classList.add("d-none");
    })
}


function showElements(...arg){
    console.log(arg);
    arg.forEach(ele=>{
        // console.log(ele);
        ele.classList.remove("d-none");
        console.log(ele);
    })
}