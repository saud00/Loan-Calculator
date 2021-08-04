// Query Selector
const calculate = document.querySelector("#calculate");

const loanAmount = document.querySelector("#loan-amount");
const years = document.querySelector("#years");
const interestRate = document.querySelector("#interest-rate");
const rMonthly = document.querySelector("#r-monthly");
const rTotal = document.querySelector("#r-total");
const rInterest = document.querySelector("#r-totalInterest");

let loanValue, interestValue, yearsValue;

document.addEventListener("input", clicked);
function clicked(e) {
  if (e.target.id == "loan-amount") return (loanValue = e.target.value);
  if (e.target.id == "interest-rate") return (interestValue = e.target.value);
  if (e.target.id == "years") return (yearsValue = e.target.value);
}

calculate.addEventListener("click", calculateFormula);

function calculateFormula(e) {
  const principal = parseFloat(loanValue);
  const calculatedInterest = parseFloat(interestValue) / 100 / 12;
  const calculatedPayments = parseFloat(yearsValue) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  console.log(x, monthly);
  if (isFinite(monthly)) {
    rMonthly.value = monthly.toFixed(2);
    rTotal.value = (monthly * calculatedPayments).toFixed(2);
    rInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    console.log("abs");
    document.querySelector(".invalid-feedback").innerHTML =
      "Please Enter correct values";
  }
}
