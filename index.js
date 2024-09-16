function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
   
    getCity(searchInputElement.value);
}
  
function getCity(city) {
    let apiKey = "30d72278aa59oa6afdf4349bbat686b9";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemp);
}
  
function getForecast(city) {
    let apiKey = "30d72278aa59oa6afdf4349bbat686b9";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
};

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
};
  
function rightDaysForecast(timestamp){

    let date = new Date(timestamp * 1000)
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
};


function displayForecast(response) {

    // console.log(response.data);
   
    // let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHTML = "";

    response.data.daily.forEach (function(day, index){

        if (index < 5) { 
            
            forecastHTML= forecastHTML + 
            `
            <div class="forecast-day">
                <div class="forecast-date">
                  ${rightDaysForecast(day.time)}
                </div>
                
                <img  src="${day.condition.icon_url}" class="forecast-icon" />
                <div class="forecast-temprs">
                  <div class="forecast-tempr">
                    <strong>${Math.round(day.temperature.maximum)}°</strong>
                  </div>
                  <div class="forecast-tempr"> 
                    ${Math.round(day.temperature.minimum)}°
                  </div>  
                </div>
            </div>
          `;
        }

       
    });
    
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
    
};
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  
function displayTemp(response) {

    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;

    let sh = Math.round(response.data.temperature.current);
    console.log(sh);
    let curTemp = document.querySelector(".current-temperature-value");
    curTemp.innerHTML = `${sh}`;

    let descriptionElement = document.querySelector("#description")
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#humidity")
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

    let wind = document.querySelector("#wind-speed")
    wind.innerHTML = `${response.data.wind.speed}km/h`;

    let date = new Date(response.data.time * 1000);
    currentDateELement.innerHTML = formatDate(date);

    let icon = document.querySelector("#icon")
    icon.innerHTML = `<img class="sun" src="${response.data.condition.icon_url}" />`;
              
    getForecast(response.data.city);
}

// getCity("Kyiv");
// getForecast("Paris");