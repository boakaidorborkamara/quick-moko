let registration_form = document.querySelector('#registration-form');

// Personal Details fields 
let first_name = document.getElementById('first-name');
let middle_name = document.getElementById('middle-name');
let last_name = document.getElementById('last-name');
let date_of_birth = document.getElementById('date-of-birth');
let home_address = document.getElementById('home-address');
let contact_number = document.getElementById('contact-number');
let position = document.getElementById('position');
let salary_payment_means = document.getElementById('salary-acceptance');
let mobile_money_number = document.getElementById('mobile-money-number');
let salary_per_month = document.getElementById('salary-per-month');
let currency = document.getElementById('currency');
// console.log(first_name, middle_name, last_name, date_of_birth, home_address, contact_number, position, salary_payment_means, mobile_money_number, salary_per_month, currency);


//Employer Details field
let employer_name = document.getElementById('employer-name');
let employer_address = document.getElementById('employer-address');
let hr_full_name = document.getElementById('hr-full-name');
let hr_home_address = document.getElementById('hr-home-address');
let hr_contact_number = document.getElementById('hr-contact-number');
// console.log(employer_name, employer_address, hr_full_name, hr_home_address, hr_contact_number);


// Gurantor Details fields 
let gurantor_fullname = document.getElementById('gurantor-fullname');
let gurantor_dob = document.getElementById('gurantor-dob');
let gurantor_home_address = document.getElementById('gurantor-home-address');
let gurantor_phone_number = document.getElementById('gurantor-phone-number');
let gurantor_relationship = document.getElementById('gurantor-relationship');
let policy = document.getElementById('policy');
// console.log(gurantor_fullname, gurantor_dob, gurantor_home_address, gurantor_phone_number, gurantor_relationship, policy)


//Will save extracted data here
let data = {};


registration_form.addEventListener('submit', getFrontEndData);





// extract data from the form and sanitize it 
function getFrontEndData (event){

    // prevent form default behaviour
    event.preventDefault();


    // extract values from field and add it to data object 
    data.first_name = first_name.value;
    data.middle_name = middle_name.value;
    data.last_name = last_name.value;
    data.date_of_birth = date_of_birth.value;
    data.home_address = home_address.value;
    data.contact_number = contact_number.value;
    data.position = position.value;
    data.salary_payment_means = salary_payment_means.value;
    data.mobile_money_number = mobile_money_number.value;
    data.salary_per_month = salary_per_month.value;
    data.currency = currency.value;
    data.employer_name = employer_name.value;
    data.employer_address = employer_address.value;
    data.hr_full_name = hr_full_name.value;
    data.hr_home_address = hr_home_address.value;
    data.hr_contact_number = hr_contact_number.value;
    data.gurantor_fullname = gurantor_fullname.value;
    data.gurantor_dob = gurantor_dob.value;
    data.gurantor_home_address = gurantor_home_address.value;
    data.gurantor_phone_number = gurantor_phone_number.value;
    data.gurantor_relationship = gurantor_relationship.value;
    data.policy = policy.value;

    console.log(data);

    return data;

};


//send data to backend api
function submitFronEndData(data){

}