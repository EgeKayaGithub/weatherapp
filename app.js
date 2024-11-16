const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")
const weatherOccasionImg = document.getElementById("weatherOccasionImg")
const temperatureElement = document.getElementById("temp")
const cityName = document.getElementById("cityName")
const humidityRate = document.getElementById("humidityRate")
const windSpeedRate = document.getElementById("windSpeedRate")

const apiKey = "e554e2e474760a3f15b5c712072e079e"

searchButton.addEventListener("click",getTheDatas)
searchInput.addEventListener("keypress",function (e){
    if(e.key == "Enter"){
        getTheDatas()
    }
})

async function getTheDatas(){
    url = prepareUrl(String(searchInput.value),apiKey)
    console.log(url)
    let data = await(await(fetch(url))).json()
    let weatherClass = new Weather(data)
    let temperatureValue = weatherClass.getTemperature()
    cityName.innerText = `${weatherClass.getCityName()}`
    temperatureElement.innerText= `${temperatureValue}°C`
    let weatherOccasion = weatherClass.getWeatherOccasion()
    console.log(weatherOccasion)
    if(weatherOccasion == "Clear"){
        weatherOccasionImg.setAttribute("src","Images/clear.png")
    }
    if(weatherOccasion == "Clouds"){
        weatherOccasionImg.setAttribute("src","Images/clouds.png")
    }
    if(weatherOccasion == "Drizzle"){
        weatherOccasionImg.setAttribute("src","Images/drizzle.png")
    }
    if(weatherOccasion == "Mist"){
        weatherOccasionImg.setAttribute("src","Images/mist.png")
    }
    if(weatherOccasion == "Rain"){
        weatherOccasionImg.setAttribute("src","Images/rain.png")
    }
    if(weatherOccasion == "Snow"){
        weatherOccasionImg.setAttribute("src","Images/snow.png")
    }
    if(weatherOccasion == "Wind"){
        weatherOccasionImg.setAttribute("src","Images/wind.png")
    }
    humidityRate.innerText = `${weatherClass.getHumidty()}%`
    windSpeedRate.innerText = `${weatherClass.getWindSpeed()} km/h`
    searchInput.value = ""
}

function prepareUrl(cityName,apiKey){
    if (cityName == null){
        alert("Please login any value to the city name !")
    }
    else{
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        return url
    }
}

class Weather{
    constructor(data){
        this.data = data
    }
    getTemperature(){
        return Math.round(Number(this.data.main.temp)-273.15)
    }
    getCityName(){
        return this.data.name
    }
    getWeatherOccasion(){
        this.occasionList = this.data.weather[0].main
        return this.occasionList
    }
    getHumidty(){
        return this.data.main.humidity
    }
    getWindSpeed(){
        return this.data.wind.speed
    }
    
}
