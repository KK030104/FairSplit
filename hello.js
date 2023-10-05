// hello.js

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".navlink ul");

  // Toggle the "show" class on the navigation links when the hamburger menu is clicked
  hamburgerMenu.addEventListener("click", function () {
    navLinks.classList.toggle("show");
    hamburgerMenu.classList.toggle("open");
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const totalPersonsInput = document.getElementById("totalPersonsInput");
  const startButton = document.getElementById("startButton");
  const inputForm = document.getElementById("inputForm");
  const inputFields = document.getElementById("inputFields");
  const calculateButton = document.getElementById("calculateButton");
  const result = document.getElementById("result");

  let no_of_persons;
  const data = { "Name": [], "Amount": [] };

  function Total_amount(lst) {
    return lst.reduce((acc, val) => acc + val, 0);
  }

  function calculate_average(lst) {
    if (!lst.length) {
      return 0; // Handle the case of an empty list to avoid division by zero
    }

    const total = lst.reduce((acc, val) => acc + val, 0);
    const average = total / lst.length;
    return average;
  }

  // Add event listeners for button clicks
  startButton.addEventListener("click", function () {
    no_of_persons = parseInt(totalPersonsInput.value);
    inputFields.innerHTML = "";

    for (let i = 0; i < no_of_persons; i++) {
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.placeholder = `Name ${i + 1}`;

      const amountInput = document.createElement("input");
      amountInput.type = "number";
      amountInput.placeholder = "Amount";

      inputFields.appendChild(nameInput);
      inputFields.appendChild(amountInput);
    }

    inputForm.classList.remove("hidden");
  });
  calculateButton.addEventListener("click", function () {
    data["Name"] = [];
    data["Amount"] = [];
  
    const nameInputs = inputFields.querySelectorAll("input[type='text']");
    const amountInputs = inputFields.querySelectorAll("input[type='number']");
  
    nameInputs.forEach((nameInput) => {
      data["Name"].push(nameInput.value);
    });
  
    amountInputs.forEach((amountInput) => {
      data["Amount"].push(parseFloat(amountInput.value));
    });
  
    // Calculate and display individual dues or repayments here
    const totalPrint = Total_amount(data["Amount"]);
    const avg = calculate_average(data["Amount"]);
  
    const individualResults = [];
  
    for (let i = 0; i < data["Amount"].length; i++) {
      const diff = data["Amount"][i] - avg;
      const individualResult = {
        name: data["Name"][i],
        diff: diff,
      };
  
      individualResults.push(individualResult);
    }
  
    result.innerHTML = "";
  
    const totalAmountResult = document.createElement("p");
    totalAmountResult.textContent = `Total amount is : ${totalPrint} /-`;
  
    const avgAmountResult = document.createElement("p");
    avgAmountResult.textContent = `The average amount is : ${avg} /-`;
  
    result.appendChild(totalAmountResult);
    result.appendChild(avgAmountResult);
  
    individualResults.forEach((individualResult) => {
      const resultMessage =
        individualResult.diff === 0
          ? `${individualResult.name} You have no dues nor any repaid amount.`
          : individualResult.diff < 0
          ? `${individualResult.name} You have to give : ${Math.abs(individualResult.diff)} /-`
          : `${individualResult.name} You have to receive : ${individualResult.diff} /-`;
  
      const individualResultElement = document.createElement("p");
      individualResultElement.textContent = resultMessage;
      result.appendChild(individualResultElement);
    });
  
    inputForm.classList.add("hidden");
    result.classList.remove("hidden");
  });
  inputForm.classList.add("hidden");
    result.classList.remove("hidden");})
