const countryInput = document.getElementById("country-input");

const search = document.getElementById("search");
const searchResult = document.getElementById("search-result");
const flag = document.getElementById("flag");
const name = document.getElementById("name");
const capital = document.getElementById("Capital");
const continent = document.getElementById("Continent");
const population = document.getElementById("Population");
const currency = document.getElementById("Currency");
const currencyShort = document.getElementById("CurrencyShort");
const language = document.getElementById("Language");

search.addEventListener("click", () => {
  let countryName = countryInput.value.trim();
  if (!countryName) {
    alert("Please enter a country name.");
    return;
  }

  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);

  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      if (!data || !data[0]) {
        alert("No country found with that name.");
        return;
      }

      searchResult.style.display = "block";
      const countryData = data[0];

      flag.src = countryData.flags.svg;
      name.innerHTML = countryData.name.common;
      capital.innerHTML = countryData.capital ? countryData.capital[0] : "N/A";
      continent.innerHTML = countryData.continents ? countryData.continents[0] : "N/A";
      population.innerHTML = countryData.population.toLocaleString();

      const currencies = countryData.currencies;
      if (currencies) {
        const currencyKey = Object.keys(currencies)[0];
        currency.innerHTML = currencies[currencyKey].name;
        currencyShort.innerHTML = currencyKey;
      } else {
        currency.innerHTML = "N/A";
        currencyShort.innerHTML = "N/A";
      }

      const languages = countryData.languages;
      language.innerHTML = languages ? Object.values(languages).join(", ") : "N/A";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Something went wrong. Please try again.");
    });
});
