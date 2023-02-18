const mainTag = document.querySelector(".main");
const cityNameTag = document.querySelector(".cityName");
const countryNameTag = document.querySelector(".countryName");
const tempFTag = document.querySelector(".tempF");
const iconImageTag = document.querySelector(".iconImage");
const currentWeatherTag = document.querySelector(".currentWeather");
const searchCityInput = document.querySelector(".search");
const errorTag = document.querySelector(".error");
const cityInfoTag = document.querySelector(".cityInfo");
let city;
let allData;

const buildUi = () => {
  const cityName = allData.location.name;
  const countryName = allData.location.country;
  const tempF = allData.current.temp_c;
  const iconImageLink = allData.current.condition.icon;
  const currentWeather = allData.current.condition.text;

  cityNameTag.innerText = cityName;
  countryNameTag.innerText = countryName;
  tempFTag.innerText = tempF;
  currentWeatherTag.innerText = currentWeather;

  iconImageTag.src = `https://${iconImageLink}`;
};

const url = (city) =>
  `http://api.weatherapi.com/v1/current.json?key=9b0bc3df6bff40eda5563431230502&q=${city}&aqi=yes`;

const getDataFromApi = async () => {
  const responseData = await fetch(url(city));
  const jsonData = await responseData.json();
  allData = jsonData;

  try {
    errorTag.innerText = ``;
    buildUi();
  } catch (error) {
    errorTag.innerText = `hey human, no city is found!`;
    cityInfoTag.innerHTML = "";

    // console.log(errorTag.includes("no"));
  }
};

searchCityInput.addEventListener("change", (event) => {
  city = event.target.value.toString();

  getDataFromApi(city);
});
