// https://v6.exchangerate-api.com/v6/a142402eed9503e4da8db3b1/latest/USD;

const API_KEY = "a142402eed9503e4da8db3b1";
const API_URL = "https://v6.exchangerate-api.com/v6/";


const converter = document.forms["input-form"];
converter.addEventListener("submit", (event) => {
    event.preventDefault();

    const sourceCurrency = document.getElementsByName("source-currency")[0].value;
    const targetCurrency = document.getElementsByName("target-currency")[0].value;
    let amount = parseFloat(document.getElementsByName("amount")[0].value);
    if (isNaN(amount)) amount = 0.0;

    const URL = `${API_URL}/${API_KEY}/latest/${sourceCurrency}`;

    console.log(URL);
    convertCurrency(URL, targetCurrency, amount);

});


function extract(exchangeRates, targetCurrency, amount) {
    const value = exchangeRates[targetCurrency];
    const result = amount * value;
    document.getElementById("result").innerText = "Converted value: " + result;
}

const convertCurrency = (url, targetCurrency, amount) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            extract(data.conversion_rates, targetCurrency, amount);
        })
        .catch(error => console.log(error));
};
