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

// result area 
let result_area = document.getElementById('result-area');

//Will save extracted data here
let frontend_data = {};




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//collect user personal infomation
personal_info_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault(); 


    // extract from form fields and add it to the frontend_data object 
    frontend_data.first_name = first_name.value;
    frontend_data.middle_name = middle_name.value;
    frontend_data.last_name = last_name.value;
    frontend_data.NIN_number = nin_number.value;

    console.log(frontend_data);

    // validate user info 
    let validation_result = validate_user_personal_info(frontend_data);


    // check if validation was successful 
    if(validation_result === 0){

        // take user to the next step in the registration process
        hideElements(personal_info_section);
        showElements(mobile_money_info_section);
        
    }
    
});


//collect user mobile money number
mobile_money_number_submit_btn.addEventListener('click', (e)=>{

    // prevent element default behavior 
    e.preventDefault();


    //extract user mobile money number from form 
    let user_mobile_money_number = mobile_money_number.value;


    //send otp to verify user mobile money number
    verifyPhoneNumberWithOTP(user_mobile_money_number);


    // add extracted mobile money number to the frontend_data object 
    frontend_data.mobile_money_number = mobile_money_number.value;
    console.log(frontend_data);


    // take user to the next step in the registration process
    hideElements(mobile_money_info_section);
    showElements(confirm_mobile_money_info_section);
    

});


//collect and validate user OTP code
confirm_mobile_money_number_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault();


    // otp user claim they received 
    frontend_data.otp_code = otp_code.value;


    //otp code that was actually generated and send to user via sms
    let otp_from_backend = localStorage.getItem("OTP");
    console.log("BE OTP", otp_from_backend);


    // validate otp 
    if(frontend_data.otp_code === otp_from_backend){

        // take user to the next step in the registration process
        hideElements(confirm_mobile_money_info_section);
        showElements(pin_code_info_section);

    }
    else{

        // notify user that otp is not validate 
        alert("OTP expired or not valid, please request a new OTP");

    }

});


//collect user PIN
pin_code_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault();


    //extract PIN codes from user 
    let pincode_field_value = pin_code.value;
    let confirmed_pincode_field_value = confirmed_pin_code.value;
    console.log(pincode_field_value, confirmed_pincode_field_value);


    // Check if value in confirm pincode and actual pincode field match
    if(pincode_field_value === confirmed_pincode_field_value){

        // extract pincode from form and add it to frontend_data object 
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




//HELPER FUNCTIONS BELOW //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//responsible to send user data to backend api
function sendDataToBackEnd(data){

    let user_data = data;
  

    // alert("sending of data working")
    // return
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
            result_area.classList.remove("d-none");
            result_area.classList.remove("bg-danger");
            result_area.innerHTML = data.message;

            // hide result area after five seconds of displaying results 
            setTimeout(() => {
                result_area.classList.add('d-none');
                window.location.href = "/";
            }, 3000);

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
                window.location.href = "/register";
            }, 3000);

            
        }
        
        
        return;
    }

    // result_content.innerHTML = "Error, try again";
    
  });

}


//hide DOM element if it is not hidden
function hideElements(ele){

    ele.classList.add("d-none");

}


//shows DOM element if it was hidden
function showElements(ele){

    ele.classList.remove("d-none");

}


// verify user phone number using OTP 
function verifyPhoneNumberWithOTP(user_phone_number){

    let phone_number = {phone:user_phone_number};
    phone_number = JSON.stringify(phone_number);

    console.log(phone_number);

    fetch("/verify/otp", {
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
        }, 50000);

        console.log(OTP)
    })

}


//validate user personal info by accepting an object 
function validate_user_personal_info(user_info_object){

    
    let user_nin_number = user_info_object.NIN_number; // user nin number 
    let nin_number_lenght = user_nin_number.length; // user nin number lenght
    console.log(nin_number_lenght);
    

    if(user_info_object.first_name === ""){

        // highlight first name field 
        highlightFormField(first_name);

        return 1;

    }
    else if (user_info_object.last_name === ""){

        // highlight last name field 
        highlightFormField(last_name);

        return 1;

    }
    else if (user_info_object.NIN_number === ""){

        // highlight nin number field 
       highlightFormField(nin_number);

       return 1;

    }
    else if (nin_number_lenght < 8 || nin_number_lenght > 8 ){


        let notification_message = "Invalid NIN number"
        displayResultArea(notification_message);

        setTimeout(() => {
            highlightFormField(nin_number)
        }, 4000)

        return 1;

    }
    
        
    return 0;

    

}


//hightlights form fields
function highlightFormField(form_field_name){

    // highlight last name field 
    form_field_name.classList.add("border-danger");

    setTimeout(()=>{
        form_field_name.classList.remove("border-danger");
        form_field_name.focus();
    }, 2000);

}


// display the HTML element that notify user about what happenend 
function displayResultArea(result_message){

    //display result div with positive result
    result_area.classList.remove("d-none");
    result_area.classList.add("bg-danger");
    result_area.classList.add("text-light");
    result_area.innerHTML = result_message;

    // hide result area after five seconds of displaying results 
    setTimeout(() => {
        result_area.classList.add('d-none');
    }, 4000);

}