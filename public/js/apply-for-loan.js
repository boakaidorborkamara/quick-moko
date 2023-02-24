// Get HTML elements 
let loan_amount = document.getElementById("loan-amount");
let payment_date = document.getElementById("payment-date");
let estimated_payment_result = document.getElementById("estimated-payment-result");
let apply_for_loan_btn = document.getElementById("apply-for-loan-btn");
let result_area = document.getElementById("result-area");


// hide result area 
result_area.style.display = "none";


// Iniatialize interest rate
let interest_rate = 0.0033;


//Create variables that store actual value user request as loan amount and payment date
let loan_amount_value = 0;
let payment_date_value = 0;


//Create a variable that stores amount to be pay back after doing interest calculations
let payback_amount = 0;


// Get current date and track the day the person take the loan
let loan_request_date = getDateUserRequestForAloan();


//Upadate loan_amount_value variable with latest values as user interacts with input field
loan_amount.addEventListener("input", ()=>{

    // update variable with latest value 
    loan_amount_value = loan_amount.value;

    // change datatype of variable to number
    loan_amount_value = parseInt(loan_amount_value);

});


// update payment_date_value variable as user interacts with input field 
payment_date.addEventListener("input", ()=>{

    payment_date_value = payment_date.value;
    estimatePayBackAmount()

});


apply_for_loan_btn.addEventListener('click', ()=>{

    // display error messages 
    // result_area.innerHTML = "We are working on intergrating MoMo to receive your loans";
    result_area.innerHTML = `Requested loan amount: ${loan_amount_value}`;

        
    result_area.style.display = "block";
        
    setTimeout(() => {
        result_area.style.display = "none";
        window.location.reload();
    }, 7000);
      
})



/////////////////////////////////////////////////////////////////////////////////////////////



// Carry out an interest formula and come up with amount a user should pay base on the amount they are taking
function estimatePayBackAmount(){

    if(loan_amount_value){
            
            let days = getNumberOfDaysBeforeLoanIsPayback(loan_request_date, payment_date_value);
            days = Math.abs(days); //change negative number to positive


            // Implement interst formula to get amount user needs to pay back 
            let sub_calculation = 1+interest_rate*days ;
            payback_amount = loan_amount_value * sub_calculation;

            console.log(sub_calculation);
            console.log(payment_date);

            estimated_payment_result.innerHTML = `$${payback_amount} LRD`;

            return;
            
    }

    alert("Enter the amount.");
    window.location.reload();
}


// implement calculation of days the person have to pay back 
function getNumberOfDaysBeforeLoanIsPayback(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}


// Keep track of the date the user request for a loan 
function getDateUserRequestForAloan(){

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let current_date = `${month}/${day}/${year}`;

    return current_date;

}


// Implement payment for requested amount 
function getRequestedCash(user_loan_amount){
     
     fetch("url",{
        method:"POST",
        body: loan_amount_value,
        "Content-Type":"application/json"
    })
    .then(response => response.json())
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.log(err);
    })
}