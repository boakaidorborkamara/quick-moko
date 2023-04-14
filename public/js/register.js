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
    let validation_result = validate_user_personal_info_fields(frontend_data);


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


    // validate mobile money field 
    let validation_result = validate_mobile_money_info_field(user_mobile_money_number)


    if(validation_result === 0){

        //send otp to verify user mobile money number
        verifyPhoneNumberWithOTP(user_mobile_money_number);


        // add extracted mobile money number to the frontend_data object 
        frontend_data.mobile_money_number = mobile_money_number.value;
        console.log(frontend_data);


        // take user to the next step in the registration process
        hideElements(mobile_money_info_section);
        showElements(confirm_mobile_money_info_section);

    }
    

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
    if(frontend_data.otp_code === ""){

        // display an error message or notification
        let notification_message = "Enter OTP code to validate your number"
        displayResultArea(notification_message); 

        // wait 4 seconds before hilighting the field with the issue 
        setTimeout(() => {

            highlightFormField(otp_code);

        }, 4000)

    }
    else if(frontend_data.otp_code === otp_from_backend){

        // take user to the next step in the registration process
        hideElements(confirm_mobile_money_info_section);
        showElements(pin_code_info_section);

    }
    else{

        // display an error message or notification
        let notification_message = "OTP not valid";
        displayResultArea(notification_message); 

        // wait 4 seconds before hilighting the field with the issue 
        setTimeout(() => {

            highlightFormField(otp_code);
            otp_code.value = "";

        }, 4000)

    }

});


//collect user PIN
pin_code_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault();


    //extract PIN codes from user 
    let pincode_field_value = pin_code.value;
    let confirmed_pincode_field_value = confirmed_pin_code.value;
    console.log(pincode_field_value, confirmed_pincode_field_value);


    // Validate if value in confirm pincode and actual pincode field match
    if(pincode_field_value === ""){

        // highlight the field with the error 
        highlightFormField(pin_code);

    }
    else if(confirmed_pincode_field_value === ""){

        // highlight the field with the error 
        highlightFormField(confirmed_pin_code);

    }
    else if(pincode_field_value === confirmed_pincode_field_value){

        // check if pincode include only numbers 
        if(isNaN(pincode_field_value)){

            // display an error message or notification
            let notification_message = "PIN code should have only numbers"
            displayResultArea(notification_message); 
            pin_code.value = "";
            confirmed_pin_code.value = "";

            return;
        }


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




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//HELPER FUNCTIONS DECLEARATION BELOW 



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


//validate user personal info fields by accepting an object 
function validate_user_personal_info_fields(user_info_object){

    
    let user_nin_number = user_info_object.NIN_number; // user nin number 
    let nin_number_lenght = user_nin_number.length; // user nin number lenght
    

    // validate user personal info 
    if(user_info_object.first_name === ""){

        // highlight first name field if no value is found
        highlightFormField(first_name);

        return 1;

    }
    else if (user_info_object.last_name === ""){

        // highlight last name field if no value is found
        highlightFormField(last_name);

        return 1;

    }
    else if (user_info_object.NIN_number === ""){

        // highlight nin number field if no value is found
       highlightFormField(nin_number);

       return 1;

    }
    else if (nin_number_lenght < 8 || nin_number_lenght > 8 ){


        // highlight nin number field if nin number is less than or greater than eight digits
        let notification_message = "Invalid NIN number"
        displayResultArea(notification_message);

        setTimeout(() => {
            highlightFormField(nin_number)
        }, 4000)

        return 1;

    }
    
        
    return 0;

    

}


//validate mobile money field
function validate_mobile_money_info_field(momo_number){

    let user_mobile_money_number = momo_number;
    let user_mobile_money_number_length = user_mobile_money_number.length;

    if(momo_number === ""){

        // check if mobile money field is empty 
        highlightFormField(mobile_money_number);

        return 1

    }
    if(user_mobile_money_number_length && user_mobile_money_number_length < 10){

        // check if number enter didn't reach ten digits 

        let notification_message = "Not a valid phone number"
        // highlight mobile money field
        displayResultArea(notification_message); 


        setTimeout(() => {

            highlightFormField(mobile_money_number);

        }, 4000)

        return 1;

    }
    
    return 0;
}


//validate OTP comfirmation field
function validate_otp_field(otp){

    let user_otp = otp;
    let user_otp_length = user_otp.length;

    if(user_otp === ""){

        // check if otp code field is empty 
        highlightFormField(otp_code);

        return 1

    }
    if(user_mobile_money_number_length && user_mobile_money_number_length < 10){

        // check if number enter didn't reach ten digits 

        let notification_message = "Not a valid phone number"
        // highlight mobile money field
        displayResultArea(notification_message); 


        setTimeout(() => {

            highlightFormField(mobile_money_number);

        }, 4000)

        return 1;

    }
    
    return 0;
}