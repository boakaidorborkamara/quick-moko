
let registration_form = document.querySelector('#registration-form');

// Personal Details fields 
let first_name = document.getElementById('first-name');
let middle_name = document.getElementById('middle-name');
let last_name = document.getElementById('last-name');
let date_of_birth = document.getElementById('date-of-birth');
let home_address = document.getElementById('home-address');
let contact_number = document.getElementById('contact-number');
let NIN_number = document.getElementById('nin-number');
let national_id = document.getElementById('national-id-card');
let position_at_job = document.getElementById('position');
let salary_deposit_to_mobile_money = document.getElementById('salary-acceptance');
let mobile_money_number = document.getElementById('mobile-money-number');
let monthly_salary = document.getElementById('salary-per-month');
let currency = document.getElementById('currency');
//Employer Details field
let employer_name = document.getElementById('employer-name');
let employer_address = document.getElementById('employer-address');
let hr_fullname = document.getElementById('hr-full-name');
let hr_home_address = document.getElementById('hr-home-address');
let hr_phone_number = document.getElementById('hr-contact-number');
let employment_letter = document.getElementById('employment-letter');
let employment_contract = document.getElementById('employment-contract');
console.log(employment_contract, employment_letter);
// Gurantor Details fields 
let guarantor_fullname = document.getElementById('gurantor-fullname');
let guarantor_date_of_birth = document.getElementById('gurantor-dob');
let guarantor_home_address = document.getElementById('gurantor-home-address');
let guarantor_phone_number = document.getElementById('gurantor-phone-number');
let guarantor_relationship_to_creditor = document.getElementById('gurantor-relationship');
let mou_from_guarantor = document.getElementById('guarantor-mou');
let guarantor_government_issued_id = document.getElementById('guarantor-id-card');
let policy = document.getElementById('policy');
console.log(mou_from_guarantor, guarantor_government_issued_id);
// result area 
let result_area = document.getElementById('result-area');
let result_content = document.getElementById('result-content');


// hide result area 
result_area.style.display = "none";


///////////////////////////////////////////////////////////////


//Will save extracted data here
let data = {};

//implement submission of data when registration btn is clicked
registration_form.addEventListener('submit', sendDataToBackEnd);


//////////////////////////////////////////////////////////////


// extract data from the form and sanitize it 
function getFrontEndData (){


    // extract values from field and add it to data object 
    data.first_name = first_name.value;
    data.middle_name = middle_name.value;
    data.last_name = last_name.value;
    data.date_of_birth = date_of_birth.value;
    data.home_address = home_address.value;
    data.contact_number = contact_number.value;
    data.NIN_number = NIN_number.value;
    data.national_id = national_id.value;
    data.position_at_job = position_at_job.value
    data.salary_deposit_to_mobile_money = salary_deposit_to_mobile_money.value;
    data.mobile_money_number = mobile_money_number.value;
    data.monthly_salary = monthly_salary.value;
    data.currency = currency.value;
    // employer's info 
    data.employer_name = employer_name.value;
    data.employer_address = employer_address.value;
    data.hr_fullname = hr_fullname.value;
    data.hr_home_address = hr_home_address.value;
    data.hr_phone_number = hr_phone_number.value;
    data.employment_letter = employment_letter.value;
    data.employment_contract = employment_contract.value;
    //gurantor info
    data.guarantor_fullname = guarantor_fullname.value;
    data.guarantor_date_of_birth = guarantor_date_of_birth.value
    data.guarantor_home_address = guarantor_home_address.value;
    data.guarantor_phone_number = guarantor_phone_number.value;
    data.guarantor_relationship_to_creditor = guarantor_relationship_to_creditor.value;
    // data.policy = policy.value;



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

