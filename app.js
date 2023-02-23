import { apiKey } from "./apikey.js";
const form = document.querySelector("#my-form");
const mainDiv = document.querySelector("#main-div");
const image1 = document.querySelector("#img1");
const cityInfo = document.querySelector("#city-info");
const displayDiv = document.querySelector("#display-div");
let src;
let city;
let temp;

function getCity(ev) {
  ev.preventDefault();
  let myForm = ev.target;
  let fd = new FormData(myForm);
  for (const [key, value] of fd) {
    city = value;
  }
  getTemp();
}

async function getTemp() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey.key}&units=imperial&lang=english`;
    let response = await fetch(url);
    let json = await response.json();
    temp = json.main.temp;
    src = json.weather[0].icon;
  } catch (err) {
    console.error(err);
    return clear();
  }
  displayInfo();
}

function displayInfo() {
  let imgSrc = `http://openweathermap.org/img/wn/${src}@2x.png`;
  mainDiv.style.display = "none";
  image1.src = imgSrc;
  cityInfo.innerText = `The current temperature is ${temp} degrees fahrenheit in ${city}`;
  displayDiv.style.display = "block";
  setTimeout(clear, 5000);
}

function clear() {
  displayDiv.style.display = "none";
  mainDiv.style.display = "block";
  form.reset();
}

form.addEventListener("submit", getCity);
