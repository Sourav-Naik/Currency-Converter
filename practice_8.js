const baseUrl =
  "https://v6.exchangerate-api.com/v6/b79be01fad89983e3fed9d38/pair";
const dropdowns = document.querySelectorAll(".dropdown select");
const imgs = document.querySelectorAll("img");
const button = document.querySelector("button");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");

let result;

for (let select of dropdowns) {
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (
      (select.name === "from" && code === "USD") ||
      (select.name === "to" && code === "INR")
    ) {
      newOption.selected = "selected";
    }
    newOption.classList.add("bg-dark");
    select.append(newOption);
  }
}

dropdowns[0].addEventListener("click", async (e) => {
  let value = e.target.value;
  imgs[0].src = `https://flagsapi.com/${countryList[value]}/flat/64.png`;
});

dropdowns[1].addEventListener("click", (e) => {
  let value = e.target.value;
  imgs[1].src = `https://flagsapi.com/${countryList[value]}/flat/64.png`;
});

button.addEventListener("click", async (evt) => {
  evt.preventDefault();
  if (input.value === "" || input.value < 1) {
    input.value = 1;
  }
  const url = baseUrl + "/" + dropdowns[0].value + "/" + dropdowns[1].value;
  let response = await fetch(url);
  let data = await response.json();
  let c = input.value * data.conversion_rate;
  msg.innerText = `${input.value}${dropdowns[0].value} = ${c}${dropdowns[1].value}`;
});
