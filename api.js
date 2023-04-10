  function loadCities() {
    const body = document.querySelector('body');
    const weatherDiv = document.querySelector('#weather');
    const API_KEY = '7ccb8eb46faa800f70a08e74b3c4050a';
    const navbarNav = document.querySelector('#navbarNav');
    const cityName = document.querySelector('#city-name');
    const cityPlaceholder = document.querySelector('#city-placeholder');
    const weatherForm = document.querySelector('#weather-form');
    const latInput = document.querySelector('#lat');
    const lonInput = document.querySelector('#lon');

    navbarNav.addEventListener('click', e => {
        e.preventDefault(); 
        if (e.target.classList.contains('location-btn')) {
            const city = e.target.textContent;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
            fetch(weatherUrl)
                .then(response => response.json())
                .then(data => {
                    // background images
                    const weather = data.weather[0].main.toLowerCase();
                    if (weather.includes('clear')) {
                        body.classList.add('clear');
                        body.classList.remove('cloudy', 'rainy', 'snowy', 'mist', 'unknown');
                      } else if (weather.includes('cloud')) {
                        body.classList.add('cloudy');
                        body.classList.remove('clear', 'rainy', 'snowy', 'mist', 'unknown');
                      } else if (weather.includes('rain') || weather.includes('drizzle') || weather.includes('mist')) {
                        body.classList.add('rainy');
                        body.classList.remove('clear', 'cloudy', 'snowy', 'unknown');
                      } else if (weather.includes('snow')) {
                        body.classList.add('snowy');
                        body.classList.remove('clear', 'cloudy', 'rainy', 'mist', 'unknown');
                      } else if (weather.includes('thunderstorm')) {
                        body.classList.add('thunderstorm');
                        body.classList.remove('clear', 'cloudy', 'rainy', 'snowy', 'mist', 'unknown');
                      } else if (weather.includes('haze') || weather.includes('smoke') || weather.includes('dust') || weather.includes('fog')) {
                        body.classList.add('haze');
                        body.classList.remove('clear', 'cloudy', 'rainy', 'snowy', 'mist', 'unknown');
                      } else {
                        body.classList.add('unknown');
                        body.classList.remove('clear', 'cloudy', 'rainy', 'snowy', 'thunderstorm', 'mist', 'haze', 'smoke', 'dust', 'fog');
                      }

                    const high = Math.round(data.main.temp_max);
                    const low = Math.round(data.main.temp_min);                    
                    const forecast = data.weather[0].description;
                    const humidity = data.main.humidity;
                    const weatherContainer = document.getElementById("weather-container")

                    document.getElementById('cityData').textContent = `${city}`;
                    document.getElementById('highData').textContent = `High: ${high}°F`;
                    document.getElementById('lowData').textContent = `Low: ${low}°F`;
                    document.getElementById('forecastData').textContent = `Forecast: ${forecast}`;
                    document.getElementById('humidityData').textContent = `Humidity: ${humidity}%`;

                    // Fetch forecast data for the selected city
                    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;
                    fetch(forecastUrl)
                        .then(response => response.json())
                        .then(data => {
                            const maximum = (a, b, c) => {
                                if (a > b && a > c) {
                                    return a;
                                } else if (b > a && b > c) {
                                    return b;
                                } else {
                                    return c;
                                }
                            };
                        
                            const result = maximum(data[0], data[1], data[2]);
                            console.log(result);
                        })
                        
                        .catch(error => {
                            console.error(error);
                            weatherDiv.textContent = 'An error occurred while fetching the forecast data.';
                        });
                })
                .catch(error => {
                    console.error(error);
                    weatherDiv.textContent = 'An error occurred while fetching the weather data.';
                });
        }
    });

    weatherForm.addEventListener('submit', e => {
        e.preventDefault(); 
        const zipCode = document.querySelector('#zip').value;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}&units=imperial`;
        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                // background images
                const weather = data.weather[0].main.toLowerCase();
                if (weather.includes('clear')) {
                    body.classList.add('clear');
                    body.classList.remove('cloudy', 'rainy', 'snowy', 'mist', 'unknown');
                  } else if (weather.includes('cloud')) {
                    body.classList.add('cloudy');
                    body.classList.remove('clear', 'rainy', 'snowy', 'mist', 'unknown');
                  } else if (weather.includes('rain') || weather.includes('drizzle') || weather.includes('mist')) {
                    body.classList.add('rainy');
                    body.classList.remove('clear', 'cloudy', 'snowy', 'unknown');
                  } else if (weather.includes('snow')) {
                    body.classList.add('snowy');
                    body.classList.remove('clear', 'cloudy', 'rainy', 'mist', 'unknown');
                  } else if (weather.includes('thunderstorm')) {
                    body.classList.add('thunderstorm');
                    body.classList.remove('clear', 'cloudy', 'rainy', 'snowy', 'mist', 'unknown');
                  } else if (weather.includes('haze') || weather.includes('smoke') || weather.includes('dust') || weather.includes('fog')) {
                    body.classList.add('haze');
                    body.classList.remove('clear', 'cloudy', 'rainy', 'snowy', 'mist', 'unknown');
                  } else {
                    body.classList.add('unknown');
                    body.classList.remove('clear', 'cloudy', 'rainy', 'snowy', 'thunderstorm', 'mist', 'haze', 'smoke', 'dust', 'fog');
                  }
                  
                const high = Math.round(data.main.temp_max);
                const low = Math.round(data.main.temp_min);
                const forecast = data.weather[0].description;
                const humidity = data.main.humidity;
                const weatherContainer = document.getElementById("weather-container")

                document.getElementById('cityData').textContent = `${data.name}`;
                document.getElementById('highData').textContent = `High: ${high}°F`;
                document.getElementById('lowData').textContent = `Low: ${low}°F`;
                document.getElementById('forecastData').textContent = `Forecast: ${forecast}`;
                document.getElementById('humidityData').textContent = `Humidity: ${humidity}%`;

               
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${API_KEY}&units=imperial`;
                fetch(forecastUrl)
                    .then(response => response.json())
                    .then(data => {
                        const maximum = (a, b, c) => {
                            if (a > b && a > c) {
                                return a;
                            } else if (b > a && b > c) {
                                return b;
                            } else {
                                return c;
                            }
                        };
                    
                        const result = maximum(data[0], data[1], data[2]);
                        console.log(result);
                    })
                    
                    .catch(error => {
                        console.error(error);
                        weatherDiv.textContent = 'An error occurred while fetching the forecast data.';
                    });
            })
            .catch(error => {
                console.error(error);
                weatherDiv.textContent = 'An error occurred while fetching the weather data.';
            });
    });

}

loadCities();



async function handleSubmit(event) {
    event.preventDefault();
    const zip = document.querySelector("#zip").value;
    try {
      // Display puns data
      await getPuns(zip);
      // Display weather data
      await getWeatherData(zip);
    } catch (error) {
      console.error(error);
    }
  }
  async function getPuns(zip) {
    try {
      const response = await fetch(
        `https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/${zip}`
      );
      if (response.ok) {
        const data = await response.json();
        const punsContainer = document.querySelector("#puns-container");
        punsContainer.innerHTML = `<p>${data.setup}</p><p>${data.punchline}</p>`;
      } else {
        throw new Error(`Failed to fetch jokes: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getWeatherData(zip) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        const cityData = document.querySelector("#cityData");
        const highData = document.querySelector("#highData");
        const lowData = document.querySelector("#lowData");
        const forecastData = document.querySelector("#forecastData");
        const humidityData = document.querySelector("#humidityData");
        cityData.textContent = data.name;
        highData.textContent = `High: ${convertToFahrenheit(data.main.temp_max)}°F`;
        lowData.textContent = `Low: ${convertToFahrenheit(data.main.temp_min)}°F`;
        forecastData.textContent = `Forecast: ${data.weather[0].description}`;
        humidityData.textContent = `Humidity: ${data.main.humidity}%`;
        const weatherContainer = document.querySelector(".weather-container");
        weatherContainer.style.display = "block";
      } else {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  

// const puns = [
//     "I tried to catch some fog but I mist.",
//     "People using umbrellas always seem to be under the weather.",
//     "What do you call a bear out in the rain? A drizzily bear.",
//     "If it really rained cats and dogs, there would be poodles all over the streets.",
//     "I hate windy weather. It really blows",
//     "The cows lay down in the rain to keep each udder dry.",
//     "When a walking stick makes you walk faster, it's called a... hurri-cane",
//     "For those people who live in northern climates, the winter is snow problem.",
//     "News of a coming flood was leaked",
//     "I'm trying to break the ice with you, but you keep giving me the cold shoulder.",
//   ];
  
//   function displayPun() {
//     // get a random pun from the puns array
//     const randomPun = puns[Math.floor(Math.random() * puns.length)];
//     // create a new element to hold the pun text
//     const punElement = document.createElement("p");
//     punElement.textContent = randomPun;
//     // get the container element and clear any existing puns
//     const punsContainer = document.getElementById("puns-container");
//     punsContainer.innerHTML = "";
//     // add the new pun element to the container
//     punsContainer.appendChild(punElement);
//   }

//   displayPun()


//   function displayWeatherData() {
//     // code to display weather data in the #weather-container element
//     const weatherContainer = document.getElementById("weather-container");
//     weatherContainer.innerHTML = "<p>Weather data goes here</p>";
//   }



  
// const form = document.getElementById("weather-form");

// form.addEventListener("submit", (event) => {
//   // prevent the default form submission behavior
//   event.preventDefault();
  
//   // remove the puns container
//   const punsContainer = document.getElementById("puns-container");
//   punsContainer.innerHTML = "";
  
//   // get the weather data and display it
//   const zip = document.getElementById("zip").value;
//   getWeatherData(zip);
// });


// document.getElementById("weather-form").addEventListener("submit", function(event) {
//     event.preventDefault(); // prevent form submission
//     const zipCode = document.getElementById("zip").value;
//     if (zipCode) {
//       // hide any existing puns
//       const punsContainer = document.getElementById("puns-container");
//       punsContainer.style.display = "none";
//       // display weather data
//       displayWeather(zipCode);
//     }
//   });
  
  


  //   const searchButton = document.getElementById("submit");
//   const locationInput = document.getElementById("search");

//   locationInput.addEventListener("keyup", function(event) {
//     if (event.key === "Enter") {
//       // clear the pun container
//       const punContainer = document.getElementById("puns-container");
//       punContainer.innerHTML = "";
//       // display a new pun
//       displayPun();
//     }
//   });

  // call the displayPun function when the page loads
//   window.onload = displayPun;
  
// function displayPun() {
//     let punContainer = document.getElementById("pun-container");
//     let currentPun = puns[punIndex];
//     punContainer.innerHTML = currentPun;
//     punIndex = (punIndex + 1) % puns.length;
//   }








const puns = [
    "I tried to catch some fog but I mist.",
    "People using umbrellas always seem to be under the weather.",
    "What do you call a bear out in the rain? A drizzily bear.",
    "If it really rained cats and dogs, there would be poodles all over the streets.",
    "I hate windy weather. It really blows",
    "The cows lay down in the rain to keep each udder dry.",
    "When a walking stick makes you walk faster, it's called a... hurri-cane",
    "For those people who live in northern climates, the winter is snow problem.",
    "News of a coming flood was leaked",
    "I'm trying to break the ice with you, but you keep giving me the cold shoulder.",
  ];
  
function displayPun() {
    // get a random pun from the puns array
    const randomPun = puns[Math.floor(Math.random() * puns.length)];
    // create a new element to hold the pun text
    const punElement = document.createElement("p");
    punElement.textContent = randomPun;
    // get the container element and clear any existing puns
    const punsContainer = document.getElementById("puns-container");
    punsContainer.textContent = "";
    // add the new pun element to the container
    punsContainer.appendChild(punElement);
  }
  displayPun();
  
  