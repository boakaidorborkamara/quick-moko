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
let personal_info_submit_btn = document.getElementById('personal-info-btn');

// mobile money details  fields
let mobile_money_info_section = document.getElementById('step2-mobile-money-info');
let mobile_money_number = document.getElementById('mobile-money-number');
let mobile_money_number_submit_btn = document.getElementById('mobile-money-number-submit-btn');

// confirm mobile money info by entering otp code fields
let confirm_mobile_money_info_section = document.getElementById('step3-confirm-mobile-money-info');
let otp_code = document.getElementById('otp-code');
let confirm_mobile_money_number_submit_btn = document.getElementById('confirm-mobile-money-number-submit-btn');

// setup pin code fields
let pin_code_info_section = document.getElementById('step4-pin-code-info');
let pin_code = document.getElementById('pin-code');
let confirmed_pin_code = document.getElementById('confirmed-pin-code');
let pin_code_submit_btn = document.getElementById('pin-code-submit-btn');
console.log(pin_code_submit_btn);

//Will save extracted data here
let data = {};


//==============================================================================


//implement collection of personal info
personal_info_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault();

    // add extracted personal info to data object 
    data.first_name = first_name.value;
    data.middle_name = middle_name.value;
    data.last_name = last_name.value;

    console.log(data);

    // hide personal info section 
    hideElements(personal_info_section);
    // show mobile money info section 
    showElements(mobile_money_info_section);
    
});


//implement collection of mobile money number
mobile_money_number_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault();

    // add extracted personal info to data object 
    data.mobile_money_number = mobile_money_number.value;

    console.log(data);
    // hide mobile money info section 
    hideElements(mobile_money_info_section);
    // show confirm mobile money info section 
    showElements(confirm_mobile_money_info_section);
    

});


//implement collection and validation of OTP code
confirm_mobile_money_number_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault();

    // add extracted personal info to data object 
    data.otp_code = otp_code.value;

    console.log(data);
    // hide confirm mobile money info section 
    hideElements(confirm_mobile_money_info_section);
    // show confirm mobile money info section 
    showElements(pin_code_info_section);
    

});


//implement collection and of PIN code
pin_code_submit_btn.addEventListener('click', (e)=>{

    e.preventDefault();


    // get values from form fields 
    let pincode_field_value = pin_code.value;
    let confirmed_pincode_field_value = confirmed_pin_code.value;
    console.log(pincode_field_value, confirmed_pincode_field_value);


    // validate if pin codes match
    if(pincode_field_value === confirmed_pincode_field_value){
        data.pin_code = pincode_field_value;
        console.log(data);
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
        }, 5000);

    }

    
    // hide confirm mobile money info section 
    // hideElements(confirm_mobile_money_info_section);
    // show confirm mobile money info section 
    // showElements(pin_code_info_section);
    

});



//===============================================================================


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

//stop showing element in the DOM
function hideElements(ele){

    ele.classList.add("d-none");

}

//show hidden element in the DOM
function showElements(ele){

    ele.classList.remove("d-none");

}