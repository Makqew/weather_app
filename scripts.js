const img = document.querySelectorAll('img')
const imgArray = Array.from(img)

const loader = document.querySelectorAll('.lds-dual-ring');
const loaderArray = Array.from(img)


const divCity = document.querySelector('#city')
const imgCity = divCity.querySelector('img');
const headingCity = divCity.querySelector('h1');


const divTemp = document.querySelector('#temp')
const imgTemp = divTemp.querySelector('img');
const headingTemp = divTemp.querySelector('h1');


const divWeather = document.querySelector('#weather')
const imgWeather = divWeather.querySelector('img');
const headingWeather = divWeather.querySelector('h1');


const divWind = document.querySelector('#wind')
const imgWind = divWind.querySelector('img');
const headingWind = divWind.querySelector('h1');


async function getWeather(){
    img.forEach(element => {
        element.style.display = 'none';
    });

    loader.forEach(element => {
        element.style.display = 'block';
    });
    
    const inputVal = document.querySelector('input').value;

    // Getting weather data
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=5dd5cc4a80a9feabbc954532502d6e3d`, {mode: 'cors'});
    const response = await data.json()

    const gifCity = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${response.name}`, {mode: 'cors'})
    const cityResponse = await gifCity.json();

    let celcius = Math.round(response.main.temp_min - 273.15);
    // console.log('CELCIUS', celcius);
    let searchTemp = '';
    if(celcius > 0){
        searchTemp = 'Warm';
    } else {
        searchTemp = 'Cold';
    }

    const gifTemp = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${searchTemp}`, {mode: 'cors'})
    const tempResponse = await gifTemp.json();



    const gifWeather = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${response.weather[0].main}`, {mode: 'cors'})
    const weatherResponse = await gifWeather.json();

    let searchWind = '';
    if(response.wind.speed > 10){
        searchWind = 'Storm';
    } else {
        searchWind = 'Chill'
    }
    const gifWind = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${searchWind}`, {mode: 'cors'})
    const windResponse = await gifWind.json();

    imgCity.src = cityResponse.data.images.original.url;
    headingCity.innerHTML = response.name;

    imgTemp.src = tempResponse.data.images.original.url;
    headingTemp.innerHTML = `Temperature ${celcius} C`;

    imgWeather.src = weatherResponse.data.images.original.url;
    headingWeather.innerHTML = `${response.weather[0].main} weather`;


    imgWind.src = windResponse.data.images.original.url;
    headingWind.innerHTML = `${searchWind} wind`;

    img.forEach(element => {
        element.style.display = 'block';
    });

    loader.forEach(element => {
        element.style.display = 'none';
    });
    
    console.log(response)
    console.log('City ', response.name)
    console.log('Minimal temperature ', response.main.temp_min,'K')
    console.log('Weather ', response.weather[0].main)
    console.log('Speed ', response.wind.speed)    
}

async function firstTime(){

    img.forEach(element => {
        element.style.display = 'none';
    });

    loader.forEach(element => {
        element.style.display = 'block';
    });

    const gifCity = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=city`, {mode: 'cors'})
    const cityResponse = await gifCity.json();

    imgCity.src = cityResponse.data.images.original.url;


    const gifTemp = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=temperature`, {mode: 'cors'})
    const tempResponse = await gifTemp.json();
    imgTemp.src = tempResponse.data.images.original.url;


    const gifWeather = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=weather`, {mode: 'cors'})
    const weatherResponse = await gifWeather.json();

    imgWeather.src = weatherResponse.data.images.original.url;

    const gifWind = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=wiwnd`, {mode: 'cors'})
    const windResponse = await gifWind.json();

    imgWind.src = windResponse.data.images.original.url;

    img.forEach(element => {
        element.style.display = 'block';
    });

    loader.forEach(element => {
        element.style.display = 'none';
    });

}
firstTime();


document.querySelector('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        getWeather();
    }
});