// Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("click", calculateResults);

// Calculate Results
function calculateResults(e) {
  console.log("Calculating...");

  // UI Variables
  const UIamount = document.getElementById("amount");
  const UIinterest = document.getElementById("interest");
  const UIyears = document.getElementById("years");
  const UImonthlyPayments = document.getElementById("monthly-payment");
  const UItotalPayment = document.getElementById("total-payment");
  const UItotalInterest = document.getElementById("total-interest");

  // Turning the UIamount input value into a decimal
  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Using the global isFinite method to ensure the user inputs enough info
  if (isFinite(monthly)) {
    UImonthlyPayments.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
  } else {
    showError("Please check your numbers");
  }

  // Due to it being a form, we prevent the default behaviour
  e.preventDefault();
}

// Show error
function showError(error) {
  // Create div element
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add bootstrap alert class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clearing error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
