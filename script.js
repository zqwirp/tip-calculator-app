let tipElement;

document.addEventListener("DOMContentLoaded", () => {
  // HANDLE BILL AND PEOPLE INPUT
  const billElement = document.getElementById("bill-input");
  billElement.value = "";
  billElement.addEventListener("change", tipCalculationEvent);
  const peopleElement = document.getElementById("people-input");
  peopleElement.value = "";
  peopleElement.addEventListener("change", tipCalculationEvent);

  // HANDLE TIP ELEMENTS
  const tipElements = document.getElementById("tip-inputs").children;
  // INITIATE TIP ELEMENT
  toggle = toggleTip(tipElements[0]);

  // ADD EVENT LISTENER FOR EVERY TIP BUTTON/INPUT
  for (let element of tipElements) {
    // EVENT LISTENER FOR TIP BUTTONS
    if (element.tagName === "BUTTON") {
      element.addEventListener("click", event => {
        toggleTip(event.target);
        tipCalculationEvent();
      });
    }

    // EVENT LISTENER FOR TIP INPUT
    if (element.tagName === "INPUT") {
      element.value = "";
      element.addEventListener("focus", event => {
        toggleTip(event.target);
      });
      element.addEventListener("change", event => {
        tipCalculationEvent();
      });
    }
  }

  // ADD EVENT LISTENER FOR RESET BUTTON
  const reset = document.getElementById("reset");
  reset.addEventListener("click", resetEvent);
});

function tipCalculationEvent() {
  const bill = document.getElementById("bill-input").value;
  const people = document.getElementById("people-input").value;
  const tip = tipElement.value / 100;

  const pattern = /^\d+$/;

  if (
    !pattern.test(parseInt(bill)) ||
    !pattern.test(parseInt(people)) ||
    !pattern.test(parseInt(tip))
  ) {
    return;
  }

  const billPerPerson = parseFloat(bill) / parseFloat(people);
  const tipPerPerson = billPerPerson * parseFloat(tip);
  const totalPerPerson = billPerPerson + tipPerPerson;

  const tipPerPersonElement = document.getElementById("tip-per-person");
  const totalPerPersonElement = document.getElementById("total-per-person");

  tipPerPersonElement.innerText = tipPerPerson.toFixed(2);
  totalPerPersonElement.innerText = totalPerPerson.toFixed(2);
}

function toggleTip(element) {
  if (tipElement) {
    if (tipElement.tagName === "BUTTON") {
      tipElement.classList.remove("selected");
    }
  }

  tipElement = element;

  if (tipElement.tagName === "BUTTON") {
    tipElement.classList.add("selected");
  }
}

function resetEvent() {
  const billElement = document.getElementById("bill-input");
  billElement.value = "";
  const peopleElement = document.getElementById("people-input");
  peopleElement.value = "";
  if (tipElement.tagName === "INPUT") tipElement.value = "";

  const tipPerPersonElement = document.getElementById("tip-per-person");
  const totalPerPersonElement = document.getElementById("total-per-person");
  tipPerPersonElement.innerText = "0.00";
  totalPerPersonElement.innerText = "0.00";
}
