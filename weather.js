let Weather = {
    'apiKey': '8242379471f3c504a5b519fefce4a5f3',
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKEY
        ).then((Response) => Response.json()).then((data) => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,speed,humidity);
        document.querySelector('.city').innerText = "Weather in:" + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn" + icon + ".png";
        document.querySelector('.description').innerText = description
        document.querySelector('.temp').innerText = "temp in:" + temp;
        document.querySelector('.humidity').innerText="humidity:" + humidity + "%";
        document.querySelector('.speed').innerText="wind speed is:" + speed + 'Mph';
    },
    search: function(){
        const city = document.querySelector('.search-bar').value;
        this.fetchWeather(city);
    }

}
document.querySelector(".submitBTN").addEventListener('click', function () {
    console.log('ping')
    Weather.search();
})

 