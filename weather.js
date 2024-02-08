let weather = {
  apiKey: "ca87ffa7b18dd5542a008cb9330ddac4",
  fetchWeather: function (city) {
    // Haetaan säätiedot OpenWeatherMap-palvelusta
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&lang=fi&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    // Tallennetaan säätiedot muuttujiin
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);

    // Päivitetään säätiedot sivulle
    document.querySelector(".city").innerText = "Sää Paikkakunnalla " + name;
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Kosteus: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Tuulen Nopeus: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    // Haetaan säätiedot käyttäjän syöttämästä paikasta
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// Tapahtumakuuntelijat hakulomakkeen nappulalle ja syöttökentälle
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// Alustava säähaku paikalle Helsinki
weather.fetchWeather("Helsinki");
