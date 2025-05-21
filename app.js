const WeatherApi = {
    key : "4287a46123b2f0b0910dad9fac0d92ed",
    base_url : 'https://api.openweathermap.org/data/2.5/weather'
}
const apiKey = "134649c4b4ec4d51a7691925241807";
const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=134649c4b4ec4d51a7691925241807&q=`;
const CityImageApi = {
    key : "a-Xy8N87NgpiaROiHCI0JI7bIP9oxq9Fp-UxNy3Hb_g",
    base_url : `https://api.unsplash.com/search/photos?query=`
}
let CityLocation = document.querySelector(".search-panel input");
let CentigradeTemprature = document.querySelector(".Centigrade");
let FerenheitTemprature = document.querySelector(".Ferenheit");
const searchCity = async (city)=>{
    //create url
    let URL = `${WeatherApi.base_url}?q=${city}&appid=${WeatherApi.key}&units=metric`;
    let IMAGE =  `${CityImageApi.base_url}${city}&client_id=${CityImageApi.key}`;
    // weather api to get the current weather
    let weatherResponse = await fetch(URL);
    //image api to get the image of that city
    let imageResponse = await fetch(IMAGE);
    let imageData = await imageResponse.json();
    console.log(imageData);
    displayImage(imageData);
    let weatherData = await weatherResponse.json();
    console.log(weatherData);
    GetWeather(weatherData);
    
}
const displayImage = (imageData) => {
    let cityImageDiv = document.querySelector('.city-image');
    let imageUrl = imageData.results[0].urls.regular;
    console.log(imageUrl);
    cityImageDiv.style.backgroundImage = `url(${imageUrl})`;
    cityImageDiv.style.backgroundSize = 'cover';
    cityImageDiv.style.backgroundPosition = 'center';
};
const GetWeather = (weatherData) =>{
    let temprature = Math.round(weatherData.main.temp);
    let Icon = weatherData.weather[0].icon;
    let weatherIcon = `https://openweathermap.org/img/wn/${Icon}@2x.png`;
    let timezoneOffset = weatherData.timezone;
    let utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;  
    // Add the timezone offset to get the local time
    let localTime = new Date(utcTime + timezoneOffset * 1000);
    let day = localTime.toLocaleDateString(undefined, { weekday: 'long'});
    let time = localTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit'});
    let DayDiv = document.querySelector(".date");
    let TimeDiv = document.querySelector(".time");
    let cityDiv = document.querySelector(".city-image");
    cityDiv.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
    let description = weatherData.weather[0].main;
    let descriptionDiv = document.querySelector(".weather-information");
    TimeDiv.innerText = `${time}`;
    DayDiv.innerText = `${day}, `;
    descriptionDiv.innerText = `${description}`;
    let WeatherIconDiv = document.querySelector("#condition");
    WeatherIconDiv.style.backgroundImage = `url(${weatherIcon})`;
    let tempDiv = document.querySelector(".temprature");
    tempDiv.innerText = `${temprature}°C`;
    //other weather details
    let PressureDiv = document.querySelector(".pressure .value");
    let HumidityDiv = document.querySelector(".humidity .value");
    let WindDiv = document.querySelector(".wind-status .value");
    let VisibilityDiv = document.querySelector(".visibility .value");
    let FeelsLikeDiv = document.querySelector(".feels-like .value");
    let pressure = weatherData.main.pressure;
    PressureDiv.innerText = `${pressure}`;
    let PressureDescritionDiv = document.querySelector(".pressure .description");
    PressureDescritionDiv.innerText = "Pa";
    let humidity = weatherData.main.humidity;
    HumidityDiv.innerText = `${humidity}%`;
    if(humidity<30){
        let HumidityDescriptionDiv = document.querySelector(".humidity .description");
        HumidityDescriptionDiv.innerText = "Low Humidity";
    }
    else if(humidity>30 && humidity<60){
        let HumidityDescriptionDiv = document.querySelector(".humidity .description");
        HumidityDescriptionDiv.innerText = "Normal Humidity";
    }
    else if(humidity>60){
        let HumidityDescriptionDiv = document.querySelector(".humidity .description");
        HumidityDescriptionDiv.innerText = "High Humidity";
    }
    let Wind = weatherData.wind.speed;
    // WindDiv.style.fontSize = "2rem";
    let WindDescritionDiv = document.querySelector(".wind-status .description");
    WindDescritionDiv.innerText = "km/h";
    WindDiv.innerText = `${Wind}`;
    let Visibility = (weatherData.visibility)/1000;
    if(Visibility<1){
        let VisibilityDescriptionDiv = document.querySelector(".visibility .description");
        VisibilityDescriptionDiv.innerText = "Low";
    }
    else if(Visibility>1 && Visibility<10){
        let VisibilityDescriptionDiv = document.querySelector(".visibility .description");
        VisibilityDescriptionDiv.innerText = "Average";
    }
    else if(Visibility>10){
        let VisibilityDescriptionDiv = document.querySelector(".visibility .description");
        VisibilityDescriptionDiv.innerText = "High";
    }

    VisibilityDiv.innerText = `${Visibility}km`;

    let FeelsLike = Math.round(weatherData.main.feels_like);
    if (FeelsLike>30){
        let FeelsLikeDescriptionDiv = document.querySelector(".feels-like .description");
        FeelsLikeDescriptionDiv.innerText = "Hot";
    }else if(FeelsLike<30 && FeelsLike>22){
        let FeelsLikeDescriptionDiv = document.querySelector(".feels-like .description");
        FeelsLikeDescriptionDiv.innerText = "Moderate";
    }
    else if(FeelsLike<22 && FeelsLike>10){
        let FeelsLikeDescriptionDiv = document.querySelector(".feels-like .description");
        FeelsLikeDescriptionDiv.innerText = "Cold";
    }
    else if(FeelsLike<10){
        FeelsLikeDescriptionDiv = document.querySelector(".feels-like .description");
        FeelsLikeDescriptionDiv.innerText = " Very Cold";
    }
    FeelsLikeDiv.innerText = `${FeelsLike}°C`;

    const SunriseTimeZoneOffset = weatherData.sys.sunrise* 1000;
    const SunSetTimeZoneOffset = weatherData.sys.sunset* 1000;
    const sunriseDate = new Date(SunriseTimeZoneOffset );
    const sunsetDate = new Date(SunSetTimeZoneOffset);
    const options = { hour: 'numeric', minute: 'numeric'};
    const sunriseTime = sunriseDate.toLocaleString('en-US', options);
    const sunsetTime = sunsetDate.toLocaleString('en-US', options);
    console.log(sunriseTime);
    console.log(sunsetTime);
    let sunriseDiv = document.querySelector(".sun-rise .time");
    sunriseDiv.innerText = `${sunriseTime}`;
    let sunsetDiv = document.querySelector(".sun-set .time");
    sunsetDiv.innerText = `${sunsetTime}`;
}
CityLocation.addEventListener('keydown' , (evt)=>{
    if (evt.key ==='Enter'){
        let city = CityLocation.value;
        searchCity(city);
    }
})
CentigradeTemprature.addEventListener('click' , (evt)=>{
    console.log("C clicked");
    let tempratue = document.querySelector(".temprature");
    let FeelsLike = document.querySelector(".feels-like .value");
    if (!(tempratue.innerText.includes("°C"))){
        let tempValue = parseFloat(tempratue.innerText.slice(0, -2));
        let feelsLikeValue = parseFloat(FeelsLike.innerText.slice(0, -2));
        console.log(tempValue);
        let feelsLikeConversion = (feelsLikeValue-32)*(5/9);
        let converetedTemprature = (tempValue-32)*(5/9);
        console.log(converetedTemprature);
        tempratue.innerText = `${converetedTemprature}°C`;
        FeelsLike.innerText = `${feelsLikeConversion}°C`;
    }
})
FerenheitTemprature.addEventListener('click' , (evt)=>{
    console.log("F clicked");
    let tempratue = document.querySelector(".temprature");
    let FeelsLike = document.querySelector(".feels-like .value");
    if (!(tempratue.innerText.includes("°F"))){
        let tempValue = parseFloat(tempratue.innerText.slice(0, -2));
        let feelsLikeValue = parseFloat(FeelsLike.innerText.slice(0, -2));
        console.log(tempValue);
        let feelsLikeConversion = feelsLikeValue*(9/5)+32;
        let converetedTemprature = tempValue*(9/5)+32;
        console.log(converetedTemprature);
        tempratue.innerText = `${converetedTemprature}°F`;
        FeelsLike.innerText = `${feelsLikeConversion}°F`;
    }
})
// Initial load with Lahore as the default city
document.addEventListener('DOMContentLoaded', () => {
    searchCity('Lahore');
});
