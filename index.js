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
  // fetchFor: function () {},
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
    luft = fetch(
      "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&lang=de&appid=0496d52bdcb26b13c5960024fbf6a834"
    )
      .then((response) => response.json())
      .then((luft) => this.luftVer(luft));
    console.log(data);
    console.log(icon);
    //  console.log("Test:", dt);
    // console.log(data, lat, lon);
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".stadt").innerText = "Wetter für " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".beschreibung").innerText = description;
    document.querySelector(".temp").innerText = temp.toFixed(1) + "°C";
    document.querySelector(".feuchte").innerText = document.querySelector(
      ".feuchte"
    ).innerText = "Luftfeuchtigkeit: " + humidity + " %";

    "Luftfeuchtigkeit: " + humidity + " %";
    document.querySelector(".wind").innerText =
      "Windgeschwindigkeit: " + speed + "km/h";
    document.querySelector(".wetter").classList.remove("laden");
    document.querySelector(".zeit").innerText = new Date(
      dt * 1000 + data.timezone
    ).toLocaleString("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    //  console.log(dt, data.timezone);
    console.log();
  },
  displayVorhersage: function (data2) {
    document.querySelector(".canvas").innerHTML = data2.daily
      .map((day, idx) => {
        if (idx > 0 && idx <= 3) {
          let dt = new Date(day.dt * 1000);
          let tempMax = "Max. " + day.temp.max + "°C";
          let tempMin = "Min. " + day.temp.min + "°C";

          return `
           
          <div class="tag">
          <h6>${dt.toDateString("de-DE", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          </h6>
          <div class="vor">
          <div class="links">
          <h4>${tempMax}</h4>
          <h4>${tempMin}</h4>
          </div>
          <img src="https://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@2x.png"/>
          <h4>${day.weather[0].description}</h4>
          </div>
          
          </div>`;
        }
      })
      .join(" ");
    console.log(data2);
    document.querySelector(".min").innerText =
      "Min " + data2.daily[0].temp.min.toFixed(1) + "°C";
    document.querySelector(".max").innerText =
      "Max " + data2.daily[0].temp.max.toFixed(1) + "°C";
  },
  luftVer: function (luft) {
    console.log(luft);
    // const { aqi } = luft.list[0].main.aqi;
    // console.log(aqi);
    let msg = (stat = luft.list[0].main.aqi);

    if (stat == 1) {
      msg = "Hervorragend";
    }
    if (stat == 2) {
      msg = "Gut";
    }
    if (stat == 3) {
      msg = "Geht so";
    }
    if (stat == 4) {
      msg = "Schlecht";
    }
    if (stat == 5) {
      msg = "Sehr schlecht";
    }
    console.log(msg);
    document.querySelector(".luft").innerText = "Luftqualität: " + msg;
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
