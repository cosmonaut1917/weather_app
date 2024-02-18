var apiKEY = '8242379471f3c504a5b519fefce4a5f3'
var search_bar = $('.search-bar')
var submitBtn = $('.submitBTN')
var data = search_bar.val()
var list =data.list
var dt_txt =dt_txt
// var dateArray = dateArray[0,6,14,21,30,38].split('YYYY-MM-DD')
// var dateArray = dateTimeArray[0].split('-');
function getApi() {
    var city = search_bar.val();
    
    var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKEY
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
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var dt_txt =dt_txt
            // $('.search-history').append("<ul><ul>").addClass("ul")
            // $('.search-history').append('<li>' + city + '</li>').addClass("li")
            var exitBtn = $('.deleteBTN')
            exitBtn.on('click', function () {
                $('.weather').empty()
            })
            const dateElement = $("<h5></h5>").text(dayjs().format("MMM D, YYYY"));
            $('.weather').append(dateElement);

            $(".weather").append(exitBtn)
            // $(".country_code").append(exitBtn)
            // $(".zip_code").append(exitBtn)
            $('.weather').append(`<h3>${data.name + ' ' + '(' + date + ')'}<img src="${iconURL}"></h3>`).addClass('main-weather-header');
            $('.weather').append(`<p> Temp: ${tempFahrenheit}°F</p>`).addClass('weatherData');
            $('.weather').append(`<p> Wind: ${windMPH} MPH</p>`).addClass('weatherData');
            $('.weather').append(`<p> Humidity: ${humidity}%</p>`).addClass('weatherData');
            $('.weather').css('background-color', 'rgba(255, 255, 255, 0.487)')
            

            search_bar.val("");
            console.log(data.coord)
            console.log(data)
            fiveday(lat, lon)

        })
}
function fiveday(lat, lon) {
    var requestURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKEY
//   dt_txt.split('',38)
    
    // var dateArray = [0,6,14,21,30,38].split()
    fetch( requestURL )
    .then(function (response) {
        return response.json();
        
    })
    .then (function(data){
        console.log(data)
    })
    let dateArray = 'YYYY/MM/DD'
    console.log(list.dt_txt)
}
function daysOfWeek(params) {
    const weekday = [
        'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
        // 0 sun,1 mon,2 tues,3 wed,4 thurs,5 fri,6 sat,7 sun
    ]
    
    const i = 0
    const now = new Date();
    const currentHour = now.getHours();
    // now.setHours(now.getHours() + 24)
    if (currentHour >= 5 && currentHour < 12) {
        timeOfDay = 'Morning'

    } else if (currentHour >= 12 && currentHour < 17) {
        timeOfDay = 'Afternoon'
    } else if (currentHour >= 17 && currentHour < 20) {
        timeOfDay = 'Evening'
    } else {
        timeOfDay = 'Night'
    }
    now.setHours(now.getHours() + 24)
    //  const dayindex = (dayindex + 1)%7
    console.log(currentHour)
}

submitBtn.on('click', function (event) {
    getApi()
    fiveday()
   
})

search_bar.on('keyup', function (event) {
    if (event.keyCode === 13) {
        getApi()
        daysOfWeek()
    }
})

// console.log(data.list[0].dt_txt)
// i hate git

