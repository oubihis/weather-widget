window.addEventListener('load', () => {
  let latitudeCity;
  let longitudeCity;
  let temperatureTitle = document.querySelector('.nav__title');
  let temperatureTemp = document.querySelector('.temp');
  let temperatureCity = document.querySelector('.city');
  let temperatureHour = document.querySelector('.hour');
  let time = new Date();


	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			latitudeCity = position.coords.latitude;
			longitudeCity = position.coords.longitude;

			let proxy = 'https://cors-anywhere.herokuapp.com/';/*This API enables cross-origin requests to anywhere. - Just for localhost*/
			const apiDarksky = `${proxy}https://api.darksky.net/forecast/d39c252c5879663dacf8bd1078b6ba60/${latitudeCity},${longitudeCity}`;

			fetch(apiDarksky)
				.then(response => {
					return response.json();
				})
				.then(dataWeather => {
					const {icon, temperature, summary } = dataWeather.currently;
					setIcons(icon, document.querySelector(".icon"));
					temperatureTitle.textContent = summary;
					// Rounding numbers to 2 digits after comma + convert F to C
					let temperatureC = (5/9) * (temperature - 32);
					let temp = Number(temperatureC);
					let convertFtoC = temp.toFixed(2);
					temperatureTemp.textContent = Number(convertFtoC) + "°C" ;

					temperatureCity.textContent = dataWeather.timezone;
					temperatureHour.textContent = time.getHours() + ":" 
					+ (time.getMinutes()<10?'0':'') 
					+ time.getMinutes(); // display two digit numbers - getMinutes() 0-9
				})
	    });
		function setIcons(icon, iconID) {
			const skycons = new Skycons({color: "#444"});
			const currentIcon = icon.replace(/-/g, "_").toUpperCase();
			skycons.play();
			return skycons.set(iconID, Skycons[currentIcon]);
		};
	}

});