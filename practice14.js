
//BASE_URL = "https://www.metaweather.com/api/location";
BASE_URL = "http://api.weatherapi.com/v1"

const dropdown = document.querySelector(".dropdown select");
const cityName = document.querySelector(".cityName select");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");

const form = document.getElementById('weatherForm');
const citySelect = document.getElementById('citySelect');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDetails = document.getElementById('weatherDetails');
weatherDetails.style.fontSize = "20px";


 

const API_KEY = "18414991ca9c48289f0194709241204";
//const weatherIcon = document.querySelector('.weather-icon img');

for (let city of cities) {
    let newOption = document.createElement("option");
    newOption.innerText = city;
    newOption.value = city;
    if (city === 'Mumbai') { // Replace 'Mumbai' with the desired default city
      newOption.selected = true;
    }
    dropdown.append(newOption);
  }

/*for (let currLoc in countryList) {
  

    let newOption = document.createElement("option");
    newOption.innerText = currLoc;
    newOption.value = currLoc;
    if(currLoc === 'INR'){
        newOption.selected = "selected";
    }
    dropdown.append(newOption);
}*/

// btn.addEventListener("click", async(evt)=>{
//     const selectedCity = cityName.value;
//     const URL = `${BASE_URL}/search/?query=${selectedCity}`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     const woeid = data[0].woeid; // Get the WOEID of the first matching city
//     const weatherURL = `${BASE_URL}/${woeid}/`;
//     let weatherResponse = await fetch(weatherURL);
//     let weatherData = await weatherResponse.json();
//     console.log(weatherData);
// });

// btn.addEventListener("click", async (evt) => {
//     try {
//         const selectedCity = cityName.value;
//         const API_KEY = "18414991ca9c48289f0194709241204";
       
//         const URL = `${BASE_URL}/current.json?key=${API_KEY}&q=${selectedCity}`;
//         // Fetch city search results
//         let response = await fetch(URL);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         let weatherData = await response.json();
//         console.log(weatherData);

//         // Update message with weather information
//         if (weatherData.error) {
//             throw new Error(`WeatherAPI Error: ${weatherData.error.message}`);
//         } else {
//             msg.innerText = `Weather in ${selectedCity}: ${weatherData.current.condition.text}, Temperature: ${weatherData.current.temp_c}°C`;
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }    
// });

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const selectedCity = citySelect.value;

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCity}`);
        const data = await response.json();
        console.log(data);

        if (data.error) {
            throw new Error(data.error.message);
        }

        const location = data.location.name;
        const country = data.location.country;
        const condition = data.current.condition.text;
        const tempC = data.current.temp_c;
        const date = new Date(data.current.last_updated);
        const iconUrl = data.current.condition.icon;


        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        weatherIcon.src = iconUrl;
        weatherIcon.alt = condition;
        weatherDetails.innerHTML = ` ${condition}<br>
            Weather in ${location}, ${country}:<br>
            Temperature: ${tempC}°C<br>
            Date: ${formattedDate}
        `;

        const body = document.querySelector("body");
        const container = document.querySelector(".container");
        
        if (condition.toLowerCase() === "mist" || condition.toLowerCase() === "clear") {
            body.style.backgroundImage = 'url("/images/mistclear.jpg")';
            // citySelect.style.backgroundColor = "#074173";
            container.style.color = "black";
            weatherDetails.style.backgroundColor = "#5BBCFF";
            weatherDetails.style.opacity = "0.8";
            
            
        } else if(condition.toLowerCase() === "partly cloudy"){  
            body.style.backgroundImage = 'url("/images/partly-cloudy1.jpg")';
            weatherDetails.style.backgroundColor = "#5BBCFF";
            weatherDetails.style.opacity = "0.8";
        }  else if(condition.toLowerCase() === "moderate or heavy rain with thunder" || condition.toLowerCase() === "rain" || condition.toLowerCase() === "moderate rain" || condition.toLowerCase() === "light rain"){ 
            body.style.backgroundImage = 'url("/images/rain1.jpg")';
            weatherDetails.style.backgroundColor = "#5BBCFF";
            weatherDetails.style.opacity = "0.8";
        } else if(condition.toLowerCase() === "fog"){
            body.style.backgroundImage = 'url("/images/fog.jpg")';
            weatherDetails.style.backgroundColor = "#5BBCFF";
            weatherDetails.style.opacity = "0.8";
        } else if(condition.toLowerCase() === "overcast" ||  condition.toLowerCase() === "cloudy"){
            body.style.backgroundImage = 'url("/images/overcast.jpg")';
            weatherDetails.style.backgroundColor = "#5BBCFF";
            weatherDetails.style.opacity = "0.8";
        } 
        else{
            body.style.backgroundImage = 'none';
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherDetails.innerHTML = `Error fetching weather data. Please try again.`;
    }

    
});



// btn.addEventListener("click", async (evt) => {
//     evt.preventDefault(); // Prevent the default form submission behavior

//     try {
//         const selectedCity = cityName.value;
//         const API_KEY = "18414991ca9c48289f0194709241204";
        
//         // Fetch city search results
//         const response = await fetch(URL);

        
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
        
//         console.log("Weather Data:", weatherData); // Log the weather data received
        
//         // Update message with weather information
//         if (weatherData.error) {
//             throw new Error(`WeatherAPI Error: ${weatherData.error.message}`);
//         } 

    

//            // Update message with weather information
// msg.innerText = `Weather in ${weatherData.location.name}, ${weatherData.location.country}: 
// ${weatherData.current.condition.text}, Temperature: ${weatherData.current.temp_c}°C`;

        
           
            

    
//     } catch (error) {
//         console.error('Error:', error);
//     }    
// });




// }