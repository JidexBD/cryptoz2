// getting our elements
const converterForm = document.querySelector("#converter-form");
const fromCurrency = document.querySelector("#from");

const toCurrency = document.querySelector("#to");
const amountInput = document.querySelector("#amount");

const resultDiv = document.querySelector("#result");

// when we load or reload we want our, we will like to seslect all the options

window.addEventListener("load", fetchCurrencies);

// listen for button click of the submit button so when the button is pressed it converts currencies

converterForm.addEventListener("submit", converterCurrency);

async function fetchCurrencies() {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/usd",
  );
  const data = await response.json();
  console.log(data);
  // we will get every single key and display it as a currency

  const currencyOptions = Object.keys(data.rates);

  console.log(currencyOptions);
  currencyOptions.forEach((currency) => {
    // from
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    // to
    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

async function converterCurrency(e) {
  // we want to get the exact same value when we refresh and not have it reset  or refresh page
  e.preventDefault();

  const amount = parseFloat(amountInput.value);

  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  // if somone enter stuff that us not a currency like -1
  if (amount < 0) {
    alert("enter a valid amount");
    return; //to return out of this function
  }
  // if it's not the above
  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`,
  );
  const data = await response.json();
  const rate = data.rates[toCurrencyValue]; //selected rate
  const convertedAmount = (amount * rate).toFixed(2);

  //   loading the result
  resultDiv.textContent = `
  ${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}
