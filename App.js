// Query Selector
const submit = document.getElementById("loan-form");

const loanAmount = document.querySelector("#loan-amount");
const interestRate = document.querySelector("#interest-rate");
const years = document.querySelector("#years");
const rMonthly = document.querySelector("#r-monthly");
const rTotal = document.querySelector("#r-total");
const rInterest = document.querySelector("#r-totalInterest");
const resultDiv = document.getElementById("2");

const loading = document.getElementById("loading");

function dangerError(e) {
  e.className = "form-control is-invalid";
  console.log("triggered");
  const danger = document.createElement("div");
  const dangertext = document.createElement("small");

  dangertext.appendChild(document.createTextNode(`Enter correct ${e.id} `));
  dangertext.className = "text-danger";
  dangertext.id = "passwordHelp";
  danger.appendChild(dangertext);
  submit.insertBefore(danger, e.parentElement.parentElement);
}

let loanValue, interestValue, yearsValue;

document.addEventListener("input", clicked);
function clicked(e) {
  if (e.target.id == "loan-amount") {
    loanAmount.className = "form-control is-valid";

    return (loanValue = e.target.value);
  }
  if (e.target.id == "interest-rate") {
    interestRate.className = "form-control is-valid";
    return (interestValue = e.target.value);
  }

  if (e.target.id == "years") {
    years.className = "form-control is-valid";
    return (yearsValue = e.target.value);
  }
}

submit.addEventListener("submit", calculateFormula);

function calculateFormula(e) {
  e.preventDefault();
  const principal = parseFloat(loanValue);
  const calculatedInterest = parseFloat(interestValue) / 100 / 12;
  const calculatedPayments = parseFloat(yearsValue) * 12;

  let x = Math.pow(1 + calculatedInterest, calculatedPayments);
  let monthly = (principal * x * calculatedInterest) / (x - 1);
  console.log(x, monthly);
  if (isFinite(monthly)) {
    loading.className = "d-block mx-auto";
    resultDiv.className = "d-none";
    setTimeout(function () {
      loading.className = "d-none";
      resultDiv.className = "d-block";
      rMonthly.value = monthly.toFixed(2);
      rTotal.value = (monthly * calculatedPayments).toFixed(2);
      rInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    }, 1000);
  } else {
    if (loanValue == null) {
      dangerError(loanAmount);
    }
    if (interestValue == null) {
      dangerError(interestRate);
    }
    if (yearsValue == null) {
      dangerError(years);
    }
  }
}

function timeoutFunction() {}
