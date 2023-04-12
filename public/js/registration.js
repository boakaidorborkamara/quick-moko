// const { verify } = require("jsonwebtoken");




// result area 
let result_area = document.getElementById('result-area');
console.log(result_area);

// form 
let registration_form = document.getElementById('registration-form');

// Personal Details fields 
let personal_info_section = document.getElementById('step1-personal-info')
let first_name = document.getElementById('first-name');
let middle_name = document.getElementById('middle-name');
let last_name = document.getElementById('last-name');
let nin_number = document.getElementById('nin-number');
let personal_info_submit_btn = document.getElementById('personal-info-btn');

// mobile money details  fields
let mobile_money_info_section = document.getElementById('step2-mobile-money-info');
let mobile_money_number = document.getElementById('mobile-money-number');
let mobile_money_number_submit_btn = document.getElementById('mobile-money-number-submit-btn');

// confirm mobile money info by entering otp code fields
let confirm_mobile_money_info_section = document.getElementById('step3-confirm-mobile-money-info');
let otp_code = document.getElementById('otp-code');
let confirm_mobile_money_number_submit_btn = document.getElementById('confirm-mobile-money-number-submit-btn');
let resend_otp_option = document.getElementById("resend-otp-option");
console.log(resend_otp_option);

// setup pin code fields
let pin_code_info_section = document.getElementById('step4-pin-code-info');
let pin_code = document.getElementById('pin-code');
let confirmed_pin_code = document.getElementById('confirmed-pin-code');
let pin_code_submit_btn = document.getElementById('pin-code-submit-btn');
console.log(pin_code_submit_btn);

//Will save extracted data here
let frontend_data = {};


//==============================================================================


//implement collection of personal info
personal_info_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault(); 

    // add extracted personal info to data object 
    frontend_data.first_name = first_name.value;
    frontend_data.middle_name = middle_name.value;
    frontend_data.last_name = last_name.value;
    frontend_data.NIN_number = nin_number.value;

    console.log(frontend_data);

    // hide personal info section 
    hideElements(personal_info_section);
    // show mobile money info section 
    showElements(mobile_money_info_section);
    
});


//implement collection of mobile money number
mobile_money_number_submit_btn.addEventListener('click', (e)=>{


    

    e.preventDefault();


    let user_mobile_money_number = mobile_money_number.value;

    verifyPhoneNumberWithOTP(user_mobile_money_number);
    // add extracted personal info to data object 
    frontend_data.mobile_money_number = mobile_money_number.value;

   
    console.log(frontend_data);
    // hide mobile money info section 
    hideElements(mobile_money_info_section);
    // show confirm mobile money info section 
    showElements(confirm_mobile_money_info_section);
    

});


//implement collection and validation of OTP code
confirm_mobile_money_number_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault();

    // add extracted personal info to data object 
    frontend_data.otp_code = otp_code.value;

    console.log(frontend_data);
    let otp_from_backend = localStorage.getItem("OTP");
    console.log("BE OTP", otp_from_backend);

    if(frontend_data.otp_code === otp_from_backend){
        alert("OTP correct")
        // hide confirm mobile money info section 
        hideElements(confirm_mobile_money_info_section);
        // show confirm mobile money info section 
        showElements(pin_code_info_section);
    }
    else{
        alert("Invalid OTP");
    }

});


//implement collection and of PIN code and sending of data to the backend
pin_code_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault();


    // get values from form fields 
    let pincode_field_value = pin_code.value;
    let confirmed_pincode_field_value = confirmed_pin_code.value;
    console.log(pincode_field_value, confirmed_pincode_field_value);


    // validate if pin codes match
    if(pincode_field_value === confirmed_pincode_field_value){
        frontend_data.pin_code = pincode_field_value;
        console.log(frontend_data);

        // send frontend data 
        sendDataToBackEnd(frontend_data);
    }
    else{

        // notify user that pin doesn't match 
        result_area.classList.remove('d-none');
        result_area.classList.add("bg-danger");
        result_area.classList.add("text-light")
        result_area.innerText = "PIN Code not match";

        setTimeout(()=>{
            result_area.classList.add("d-none");
            // empty form field 
            pin_code.value="";
            confirmed_pin_code.value="";
        }, 4000);

    }
    

});


// implement resending of otp 
resend_otp_option.addEventListener('click', (e)=>{

    e.preventDefault();

    let user_mobile_money_number = mobile_money_number.value;

    verifyPhoneNumberWithOTP(user_mobile_money_number);

    console.log(frontend_data);
    
});




//===============================================================================


//send data to backend api
function sendDataToBackEnd(data){

    // prevent form default behaviour
    // event.preventDefault();

    let user_data = data;
  
    console.log('FRONTEND DATA', user_data);

    let url = '/api/v1/clients';
    
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
            result_area.classList.remove("d-none");
            result_area.classList.remove("bg-danger");
            result_area.innerHTML = data.message;

            // hide result area after five seconds of displaying results 
            setTimeout(() => {
                result_area.classList.add('d-none');
                window.location.href = "/";
            }, 4000);

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

//stop showing element in the DOM
function hideElements(ele){

    ele.classList.add("d-none");

}


//show hidden element in the DOM
function showElements(ele){

    ele.classList.remove("d-none");

}


// verify user phone number using OTP 
function verifyPhoneNumberWithOTP(user_phone_number){

    let phone_number = {phone:user_phone_number};
    phone_number = JSON.stringify(phone_number);

    console.log(phone_number);

    fetch("/verify", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: phone_number
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('DATA', data);

        // save otp to local storage 
        localStorage.setItem("OTP", data.otp);
        const OTP = localStorage.getItem("OTP");

        //delete otp after a specific time period
        setTimeout(()=>{
            localStorage.removeItem("OTP");
            const OTP = localStorage.getItem("OTP");
        }, 30000);

        console.log(OTP)
    })

}


//start count down after OTP is sent
function startOtpTimer (){
    
}