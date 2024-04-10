var apiKEY = '8242379471f3c504a5b519fefce4a5f3'
var search_bar = $('.search-bar')
var submitBtn = $('.submitBTN')
function getApi() {
    var city = search_bar.val();
    var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKEY;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            $('.weather').empty()
            var dateUnix = data.dt; // change from unix
            var date = new Date(dateUnix * 1000).toLocaleDateString()
            var tempKelvin = data.main.temp; // The API default temperature unit is Kelvin
            var tempFahrenheit = ((tempKelvin - 273.15) * 1.8 + 32).toFixed(2) // Convert Kelvin temp to Fahrenheit
            var wind = data.wind.speed; // The API default wind speed unit is meters/sec
            var windMPH = (wind * 2.2369).toFixed(2) // Convert meters/sec to miles/hour
            var humidity = data.main.humidity
            var iconCode = data.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";
            // $('.search-history').append("<ul><ul>").addClass("ul")
            // $('.search-history').append('<li>' + city + '</li>').addClass("li")
            var exitBtn = $('.deleteBTN')
            exitBtn.on('click', function () {
                $('.weather').empty()
            })
            $(".weather").append(exitBtn)
            $('.weather').append(`<h3>${data.name + ' ' + '(' + date + ')'}<img src="${iconURL}"></h3>`).addClass('main-weather-header');
            $('.weather').append(`<p> Temp: ${tempFahrenheit}°F</p>`).addClass('weatherData');
            $('.weather').append(`<p> Wind: ${windMPH} MPH</p>`).addClass('weatherData');
            $('.weather').append(`<p> Humidity: ${humidity}%</p>`).addClass('weatherData');
            $('.weather').css('background-color', 'rgba(255, 255, 255, 0.487)')
            search_bar.val("");
            localStorage.setItem('weatherData', JSON.stringify({
                city: data.name,
                date: date,
                iconURL: iconURL,
                tempFahrenheit: tempFahrenheit,
                windMPH: windMPH,
                humidity: humidity
            }));
        })
}
submitBtn.on('click', function (event) {
    getApi()
    console.log('ping')
})

search_bar.on('keyup', function (event) {
    if (event.keyCode === 13) {
        getApi()
    }
})

// i hate gits