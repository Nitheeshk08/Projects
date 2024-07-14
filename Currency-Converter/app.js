const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



// let (code in countryList) {
//     console.log(code, countryList[code]);
// }

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOtion = document.createElement("option");
        newOtion.innerText = currCode;
        newOtion.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOtion.selected = "selected";
        } else if(select.name === "to" && currCode === "INR") {
            newOtion.selected = "selected";
        }
        select.append(newOtion);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 0;
        amount.value = "0";
    }

    //console.log(fromCurr.value, toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate);

    let finalAmounnt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmounnt} ${toCurr.value}`;
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
}); 