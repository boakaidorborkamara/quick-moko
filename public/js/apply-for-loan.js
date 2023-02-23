let loan_amount = document.getElementById("loan-amount");
let payment_date = document.getElementById("payment-date");
let estimated_payment_result = document.getElementById("estimated-payment-result");
let apply_for_loan_btn = document.getElementById("apply-for-loan-btn");
let result_area = document.getElementById("result-area");
// hide result area 
result_area.style.display = "none";



let interest_rate = 0.0033;
console.log(loan_amount, payment_date);

let loan_amount_value = 0;
let payment_date_value = 0;


// Get current date and track the day the person take the loan
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let current_date = `${month}/${day}/${year}`;

console.log(current_date);







loan_amount.addEventListener("input", ()=>{
    loan_amount_value = loan_amount.value;

    loan_amount_value = parseInt(loan_amount_value);
    console.log(typeof loan_amount_value)
    console.log(loan_amount_value)
})



payment_date.addEventListener("input", estimatePayment)


function estimatePayment(){

    if(loan_amount_value){

            payment_date_value = payment_date.value;
            // alert(payment_date_value);
            
            let days = getNumberOfDays(current_date, payment_date_value);
            days = Math.abs(days)
            console.log(days);

            let sub_calculation = 1+interest_rate*days ;
            let amount = loan_amount_value * sub_calculation;

            console.log(sub_calculation);
            console.log(amount);

            estimated_payment_result.innerHTML = `$${amount} LRD`;

            return;
            
    }

    alert("Enter the amount.");
    window.location.reload();
}


// implement calculation of days the person have to pay back 
function getNumberOfDays(start, end) {
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



apply_for_loan_btn.addEventListener('click', ()=>{

    // display error messages 
    result_area.innerHTML = "We are working on intergrating MoMo to receive your loans";
        
    result_area.style.display = "block";
        
    setTimeout(() => {
        result_area.style.display = "none";
        window.location.reload();
    }, 4000);
    
    
})