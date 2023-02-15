const body = document.querySelector('body');
const dot_c = '&#176';
const url = 'http://api.weatherapi.com/v1/forecast.json?q=Minsk&lang=ru&days=3';
let city = document.createElement('div');
let temp = document.getElementById('temp');
let img = document.getElementsByClassName('image');
let container = document.getElementsByClassName('container');
let text = document.getElementsByClassName('text');
let dataText = document.getElementById('dataText')
let tempDayNight = document.getElementsByClassName('tempDayNight');

city.setAttribute('id', 'cityName');
body.prepend(city);

fetch(url, {
	headers: {
		'key': '8447e38f04c24caa9ba165857232501',
		
	}
})
.then(responce => {
    if(responce.ok) {
        return responce.json()
    } else alert(responce.status);
})

.then((data) => {
	try {
		const dataDay = data.forecast.forecastday[2].date;
		const urlNav = data.forecast.forecastday;
		const tempNightNow = urlNav[0].day.mintemp_c.toFixed(0) + dot_c;
		const tempNightNext = urlNav[1].day.mintemp_c.toFixed(0) + dot_c;
		const tempNighAfterNext = urlNav[2].day.mintemp_c.toFixed(0) + dot_c;

		img[0].setAttribute('src', data.current.condition.icon);
		img[1].setAttribute('src', urlNav[1].day.condition.icon);
		img[2].setAttribute('src', urlNav[2].day.condition.icon);

		city.innerHTML = data.location.name; 
		temp.innerHTML = data.current.temp_c + dot_c;
		container[1].innerHTML = data.current.condition.text;
		dataText.innerHTML = dataDay[8] + dataDay[9];

		text[0].innerHTML = "&#183" + data.current.condition.text;
		text[1].innerHTML = "&#183" + urlNav[1].day.condition.text;
		text[2].innerHTML = "&#183" + urlNav[2].day.condition.text;

		tempDayNight[0].innerHTML = urlNav[0].day.maxtemp_c.toFixed(0) + dot_c + "/ " + tempNightNow
		tempDayNight[1].innerHTML = urlNav[1].day.maxtemp_c.toFixed(0) + dot_c + "/ " + tempNightNext
		tempDayNight[2].innerHTML = urlNav[2].day.maxtemp_c.toFixed(0) + dot_c + "/ " + tempNighAfterNext

	} catch (error) {
		console.log(data + ':' + error);
	}
})