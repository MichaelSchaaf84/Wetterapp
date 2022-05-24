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
      .then((data) => this.displayWetter(data))
      .catch(console.err);
  },
  // fetchFor: function () {},
  displayWetter: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, temp_min, temp_max, humidity } = data.main;
    const { speed } = data.wind;
    const { lon, lat } = data.coord;
    const { dt } = data;

    console.log(dt, data.timezone);
    let forcast = fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&lang=de&appid=0496d52bdcb26b13c5960024fbf6a834"
    )
      .then((response) => response.json())
      .then((forcast) => this.displayVorhersage(forcast));
    let luft = fetch(
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
    document.querySelector(
      ".stadt"
    ).innerHTML = `<div class="stadt">Wetter für <span style="color:#ec6e4c">${name}</span>`;
    /*"Wetter für " + name;*/
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@4x.png";
    document.querySelector(".beschreibung").innerText = description;
    document.querySelector(".temp").innerText = temp.toFixed(1) + "°C";
    document.querySelector(".feuchte").innerText = document.querySelector(
      ".feuchte"
    ).innerText = "Luftfeuchtigkeit: " + humidity + " %";

    "Luftfeuchtigkeit: " + humidity + " %";
    document.querySelector(".wind").innerText = speed + "km/h";
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
  displayVorhersage: function (forcast) {
    document.querySelector(".canvas").innerHTML = forcast.daily
      .map((day, idx) => {
        if (idx > 0 && idx <= 3) {
          let dt = new Date(day.dt * 1000).toLocaleString("de-DE", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          let tempMax = day.temp.max.toFixed(1) + "°C";
          let tempMin = day.temp.min.toFixed(1) + "°C";

          return `
           
          <div class="tag">
          <h6>${dt}
          </h6>
          <div class="vor">
          <div class="links">
           <div class="windc">
        <div class="svgwind">
             <svg class="svgFor"
                stroke="currentColor"
                fill="#EC6E4C"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M416 0c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm-160-16C256 50.1 205.9 0 144 0S32 50.1 32 112v166.5C12.3 303.2 0 334 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-34-12.3-64.9-32-89.5V112zM144 448c-44.1 0-80-35.9-80-80 0-25.5 12.2-48.9 32-63.8V112c0-26.5 21.5-48 48-48s48 21.5 48 48v192.2c19.8 14.8 32 38.3 32 63.8 0 44.1-35.9 80-80 80zm16-125.1V112c0-8.8-7.2-16-16-16s-16 7.2-16 16v210.9c-18.6 6.6-32 24.2-32 45.1 0 26.5 21.5 48 48 48s48-21.5 48-48c0-20.9-13.4-38.5-32-45.1z"
                ></path>
              </svg>
        </div>
        <div>${tempMax}</div>
      </div>
          <div class="windc">
        <div class="svgwind">
             <svg
              class="svgFor"
                stroke="currentColor"
                fill="#EC6E4C"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M416 0c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm-160-16C256 50.1 205.9 0 144 0S32 50.1 32 112v166.5C12.3 303.2 0 334 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-34-12.3-64.9-32-89.5V112zM144 448c-44.1 0-80-35.9-80-80 0-25.5 12.2-48.9 32-63.8V112c0-26.5 21.5-48 48-48s48 21.5 48 48v192.2c19.8 14.8 32 38.3 32 63.8 0 44.1-35.9 80-80 80zm16-125.1V304c0-8.8-7.2-16-16-16s-16 7.2-16 16v18.9c-18.6 6.6-32 24.2-32 45.1 0 26.5 21.5 48 48 48s48-21.5 48-48c0-20.9-13.4-38.5-32-45.1z"
                ></path>
              </svg>
        </div>
        <div>${tempMin}</div>
      </div>
          
          </div>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/>
          <div class="descriptionFor">${day.weather[0].description}</div>
          </div>
          
          </div>`;
        }
      })
      .join(" ");
    console.log(forcast);
    document.querySelector(".min").innerText =
      forcast.daily[0].temp.min.toFixed(1) + "°C";
    document.querySelector(".max").innerText =
      forcast.daily[0].temp.max.toFixed(1) + "°C";
    let { sunrise, sunset } = forcast.current;
    sunrise = sunrise - 7200;
    sunset = sunset - 7200;
    let timezone = forcast.timezone_offset;
    console.log(timezone, sunrise);
    let auf = new Date((sunrise + timezone) * 1000).toLocaleString("de-DE", {
      hour: "numeric",
      minute: "numeric",
    });
    document.querySelector(".aufgang").innerText = auf + " Uhr";

    console.log(auf);
    let unter = new Date((sunset + timezone) * 1000).toLocaleString("de-DE", {
      hour: "numeric",
      minute: "numeric",
    });
    document.querySelector(".untergang").innerText = unter + " Uhr";
  },
  zeitSonne: function (forcast) {},
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
