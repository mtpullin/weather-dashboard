
var searchText = document.querySelector(".search")
var searchBtn = document.querySelector(".btn")
var date = document.querySelector(".date")
var previousSearch = document.querySelector(".previous")
// var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
// console.log(searchHistory);
var displayWeather = function(d) {
    var F = Math.round(((parseFloat(d.list[0].main.temp)-273.15)*1.8)+32);
    document.querySelector(".cityname").innerHTML = d.city.name
    document.querySelector(".temperature").innerHTML ="Temperature: " + F + '&deg;'
    document.querySelector(".humidity").innerHTML = "Humidity: " + d.list[0].main.humidity + "%"
    document.querySelector(".windspeed").innerHTML = "Wind Speed: " + d.list[0].wind.speed + " MPH"
    var lat = d.city.coord.lat;
    var lon = d.city.coord.lon;
    var uvurl = "https://api.openweathermap.org/data/2.5/uvi/forcast?lat=" + lat + "&lon=" + lon + "&appid=80e8a3ba300d33a584046e348673193d" + "&cnt=1";
    fetch(uvurl).then(function(response){
        var uvIndex = document.querySelector(".uvindex");
        uvIndex.setAttribute("class", "badge badge-danger");
        uvIndex.innerHTML = "UV Index: " + response.data[0].value;
    })
}
var citySearch = function(cityname) {
    
    var apiKey = "https://api.openweathermap.org/data/2.5/forecast?q=miami&appid=80e8a3ba300d33a584046e348673193d"

    fetch(apiKey).then(function(response) {
    
    if(response.ok) {
        return response.json().then(function(data){
            console.log(data)
            displayWeather(data);
        })
    } else {
        alert("please enter valid city name.")
    }
    // const currentDate = new Date(response.data.dt*1000);
    //         console.log(currentDate);
    //         const day = currentDate.getDate();
    //         const month = currentDate.getMonth() + 1;
    //         const year = currentDate.getFullYear();
    //         date.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
})}
// function renderSearchHistory() {
//     previousSearch.innerHTML = "";
//     for (let i=0; i<searchHistory.length; i++) {
//         const previousCity = document.createElement("input");
//         previousCity.setAttribute("readonly",true);
//         previousCity.setAttribute("class", "form-control d-block bg-white");
//         previousCity.setAttribute("value", searchHistory[i]);
//         previousCity.addEventListener("submit",function() {
//             citySearch(previousCity.value);
//         })
//         previousSearch.append(previousCity);
//     }
// }

// renderSearchHistory();
// if (searchHistory.length > 0) {
//     citySearch(searchHistory[searchHistory.length - 1]);
// }

// searchBtn.addEventListener("submit",function(event) {
//     event.preventDefault();
//     const searchTerm = searchText.value;
//     displayWeather(searchTerm);
//     searchHistory.push(searchTerm);
//     localStorage.setItem("search",JSON.stringify(searchHistory));
//     renderSearchHistory();
// })
addEventListener("submit", citySearch())