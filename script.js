//set titles
let errorsCounter = 0;
const nameValue = document.getElementById("name");
const emailValue = document.getElementById("mail");
const jobRole = document.getElementById("title");
const otherTitle = document.getElementById("other-title");

//color section
const designTheme = document.getElementById("design");
const designsColors = document.querySelectorAll("#color option");
const shirtColor = document.getElementById("color");
const jsPuns = ["cornflowerblue", "darkslategrey", "gold"];
const heartJS = ["tomato", "steelblue", "dimgrey"];

//register for activites section
const activities = document.querySelector("fieldset.activities");
const eventPrices = [
  //price increases for every activity added
  { name: "all", price: 200, time: "all" },
  { name: "js-frameworks", price: 100, time: "tu9a" },
  { name: "js-libs", price: 100, time: "tu1p" },
  { name: "express", price: 100, time: "tu9a" },
  { name: "node", price: 100, time: "tu1p" },
  { name: "build-tools", price: 100, time: "w9a" },
  { name: "npm", price: 100, time: "w1p" }
];
let cost = 0; //sets up total cost
const totalCost = document.createElement("p");
activities.appendChild(totalCost);
activities.lastChild.setAttribute("id", "sum");

const submitButton = document.querySelector('[type="submit"]');

function setFocus(tag) {
  const myElement = document.getElementById(tag);
  myElement.focus();
}
setFocus("name");

//hides or shows 'other' if selected or not
$("#other-title").hide();
jobRole.addEventListener("change", () => {
  if (jobRole.value === "other") {
    $("#other-title").show();
    setFocus("other-title");
  } else {
    $("#other-title").hide();
  }
});
//color dropdown choices
function themeSelector(state) {
  const shirtNode = document.getElementById("color").firstElementChild;
  const defaultColor = document.createElement("option");
  const colorText = document.createTextNode("Please Select a Shirt Color");

  if (state === true) {
    defaultColor.setAttribute("selected", "");
    defaultColor.setAttribute("value", "default");
    defaultColor.appendChild(colorText);
    shirtColor.insertBefore(defaultColor, shirtNode);
  }
}
//
themeSelector(true);

function colorSelector(what, display) {
  for (let i = 0; i < what.length; i++) {
    const whatColor = (document.querySelector(
      `[value=${what[i]}]`
    ).style.display = display);
  }
}
$("#colors-js-puns").hide();

designTheme.addEventListener("change", () => {
  if (designTheme.value === "js puns") {
    $("#colors-js-puns").show();
    colorSelector.call(this, heartJS, "none");
    colorSelector.call(this, jsPuns, "block");
    shirtColor.value = "default";
  } else if (designTheme.value === "heart js") {
    $("#colors-js-puns").show();
    colorSelector.call(this, jsPuns, "none");
    colorSelector.call(this, heartJS, "block");
    shirtColor.value = "default";
  } else {
    $("#colors-js-puns").hide();
  }
});
//all the events are stored in eventPrices
function eventSelectorNode() {
  cost = 0;
  for (const reset in eventPrices) {
    const x = document.querySelector(`[name=${eventPrices[reset].name}]`);
    x.removeAttribute("disabled"), x.parentNode.removeAttribute("class");
  }

  if (activities.querySelectorAll("input:checked").length === 0) {
    //to test for errors in console log
    console.log("No events have been selected");
    errorsCounter += 1;
    const x = document.querySelector(".activities").firstElementChild;
    const theSpan =
      "<span class='line box'> (please select at least one activity)</span>";
    x.innerHTML += theSpan;
  } else {
    const resetItems = document.querySelector([".box"]);
    if (resetItems !== null) {
      resetItems.remove();
      errorsCounter -= 1;
    }
  }

  for (const checkbox in eventPrices) {
    const x = document.querySelector(`[name=${eventPrices[checkbox].name}]`);
    if (x.checked) {
      const compare = eventPrices[checkbox].time;
      cost += parseInt(eventPrices[checkbox].price);
      for (const times in eventPrices) {
        const other = eventPrices[times].time;
        const y = document.querySelector(`[name=${eventPrices[times].name}]`);
        if (y.checked === false) {
          if (compare === other) {
            y.setAttribute("disabled", "");
            y.parentNode.setAttribute("class", "disabled");
          }
        }
      }
    }
  }
  const totalFinal = document.getElementById("sum");
  const theSum = document.createTextNode(`Total $ ${cost}`);
  totalFinal.appendChild(theSum);
  const message = `Total $ ${cost}`;
  totalFinal.innerHTML = message;
}
eventSelectorNode();

// EventListener for when checkeventSelectorNode changes
activities.addEventListener("change", () => {
  eventSelectorNode();
  console.log("CheckeventSelectorNode Changed");
});

const payment = document.getElementById("payment");
const removeSelect = payment.firstElementChild;
removeSelect.parentNode.removeChild(removeSelect);
//credit card gets selected first
document.querySelector('[value="credit card"]').setAttribute("selected", "");
const creditCard = document.getElementById("credit-card");
const payFieldset = document
  .getElementById("payment")
  .parentNode.querySelectorAll("fieldset>div");

//payment options not selected are hidden
function hidePaymentOptions(option, what) {
  for (let i = 0; i < what.length; i++) {
    if (i === option) {
      what[i].style.display = "block";
    } else {
      what[i].style.display = "none";
    }
  }
}
hidePaymentOptions(0, payFieldset);

payment.addEventListener("change", () => {
  if (payment.value === "credit card") {
    hidePaymentOptions(0, payFieldset);
  } else if (payment.value === "paypal") {
    hidePaymentOptions(1, payFieldset);
  } else {
    hidePaymentOptions(2, payFieldset);
  }
});

let message = "Please correct the following field";

function setError(id, message) {
  id.setAttribute("class", "error");
  const x = document.querySelector(`[for= \'${id.id}\']`);
  const theSpan = `<span class=\'line\'> (${message})</span>`;
  x.innerHTML += theSpan;
}

//email validation
function validEmail(check) {
  return /^\w+@\w+(\.(\w)+)$/i.test(check.value);
}

//credit card number validation
function validate(num, bottom, top, message) {
  const id = document.getElementById(num);
  const testnum = id.value;
  if (testnum === "" || isNaN(testnum)) {
    setError(id, message);
    errorsCounter += 1;
  } else if (testnum.length < bottom || testnum.length > top) {
    errorsCounter += 1;
    setError(id, message);
  } else {
    console.log(`we have a valid ${num}!`);
  }
}

submitButton.addEventListener("click", e => {
  //to test in cosole log
  console.log(errorsCounter);
  for (let i = 0; i < errorsCounter; i++) {
    const resetItems = document.querySelector([".line"]);
    if (document.querySelector('[class="error"]')) {
      document
        .getElementById(document.querySelector('[class="error"]').id)
        .removeAttribute("class");
    }
    resetItems.remove();
  }

  errorsCounter = 0;

  if (nameValue.value === "") {
    errorsCounter += 1;
    message = "Please add a name";
    setError(nameValue, message);
  }
  // Email section
  if (!validEmail(emailValue)) {
    errorsCounter += 1;
    message = "Please format email as follows: carlos.campos@gmail.com";
    setError(emailValue, message);
  }

  if (activities.querySelectorAll("input:checked").length === 0) {
    eventSelectorNode();
  }
  // Payment form
  if (payment.value === "credit card") {
    const ccinfo = [
      ["cc-num", "zip", "cvv"],
      [13, 5, 3],
      [16, 5, 3],
      ["Enter 13 to 16 digit number", "5 Digits", "3 Digits"]
    ];
    for (let i = 0; i <= 2; i++) {
      validate(ccinfo[0][i], ccinfo[1][i], ccinfo[2][i], ccinfo[3][i]);
    }
  }

  if (errorsCounter > 0) {
    e.preventDefault(); //check errors in console log
    console.log(`THE NUMBER OF ERRORS: ${errorsCounter}`);
    alert("Please correct the following fields.");
    setFocus(document.querySelector(".error").id);
  } else if (errorsCounter === 0) {
    alert("Registration Complete!");
  }
});
