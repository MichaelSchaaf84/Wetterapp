let wetter = {
  apiKey: "0496d52bdcb26b13c5960024fbf6a834",
  fetchWetter: function (city) {
    let data = fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&lang=de&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWetter(data));
  },
  displayWetter: function (data, data2) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, temp_min, temp_max, humidity } = data.main;
    const { speed } = data.wind;
    const { lon, lat } = data.coord;
    const { dt } = data;

    console.log(dt, data.timezone);
    data2 = fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&lang=de&appid=0496d52bdcb26b13c5960024fbf6a834"
    )
      .then((response) => response.json())
      .then((data2) => this.displayVorhersage(data2));

    console.log(data);
    console.log(icon);
    //  console.log("Test:", dt);
    // console.log(data, lat, lon);
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".stadt").innerText = "Wetter in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".beschreibung").innerText = description;
    document.querySelector(".temp").innerText = temp.toFixed(1) + "°C";
    document.querySelector(".min").innerText =
      "Min " + temp_min.toFixed(1) + "°C";
    document.querySelector(".max").innerText =
      "Max " + temp_max.toFixed(1) + "°C";
    document.querySelector(".feuchte").innerText = document.querySelector(
      ".feuchte"
    ).innerText = "Luftfeuchtigkeit: " + humidity + " %";

    "Luftfeuchtigkeit: " + humidity + " %";
    document.querySelector(".wind").innerText =
      "Windgeschwindigkeit: " + speed + "km/h";
    document.querySelector(".wetter").classList.remove("laden");
    document.querySelector(".zeit").innerText = new Date(
      dt * 1000 + data.timezone
    );
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    //  console.log(dt, data.timezone);
    console.log();
  },
  displayVorhersage: function (data2) {
    document.querySelector(".tag").innerHTML = data2.daily
      .map((day, idx) => {
        if (idx <= 2) {
          let dt = new Date(day.dt * 1000);
          let tempMax = "Max. " + day.temp.max + "°C";
          let tempMin = "Min. " + day.temp.min + "°C";

          return `<div class="tag"><h6>${dt.toDateString()}</h6><h4>${tempMax}</h4><h4>${tempMin}</h4><div class="vor"><img src="https://openweathermap.org/img/wn/${
            day.weather[0].icon
          }.png"/><h4>${day.weather[0].description}</h4></div></div>`;
        }
      })
      .join(" ");
    console.log(data2);
  },
  suche: function () {
    this.fetchWetter(document.querySelector(".suchfeld").value);
  },
};
document.querySelector(".suche button").addEventListener("click", function () {
  wetter.suche();
});
document.querySelector(".suchfeld").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    wetter.suche();
  }
});
wetter.fetchWetter("Berlin");
