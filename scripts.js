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


const divSky = document.querySelector('#weather')
const imgSky = divSky.querySelector('img');
const headingSky = divSky.querySelector('h1');


const divWind = document.querySelector('#wind')
const imgWind = divWind.querySelector('img');
const headingWind = divWind.querySelector('h1');

function renderDiv(){
    let body = document.getElementsByTagName('main')

    let div = document.createElement('div')
    let heading = document.createElement('h1')
    let img = document.createElement('img');
    let divLoader = document.createElement('div');
    divLoader.classList.add('lds-dual-ring')

    div.appendChild(div)
    div.appendChild(heading)
    div.appendChild(img)
    div.appendChild(divLoader)

    imgSky.src = skyResponse.data.images.original.url;
    headingSky.innerHTML = `${element} weather`;
}


async function getWeather(){
    img.forEach(element => {
        element.style.display = 'none';
    });

    loader.forEach(element => {
        element.style.display = 'block';
    });
    
    const inputVal = document.querySelector('input').value;

    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=5dd5cc4a80a9feabbc954532502d6e3d`, {mode: 'cors'});
    const response = await data.json()

    getCity(response);
    getTemp(response);
    getSky(response.weather[0].main);
    getWind(response);

    img.forEach(element => {
        element.style.display = 'block';
    });

    loader.forEach(element => {
        element.style.display = 'none';
    });
    
    // console.log(response)
    // console.log('City ', response.name)
    // console.log('Minimal temperature ', response.main.temp_min,'K')
    // console.log('Weather ', response.weather[0].main)
    // console.log('Speed ', response.wind.speed)    
}

async function getCity(element){
    const gifCity = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${element.name}`, {mode: 'cors'})
    const cityResponse = await gifCity.json();

    imgCity.src = cityResponse.data.images.original.url;
    headingCity.innerHTML = element.name;
}

async function getTemp(element){
    let celcius = Math.round(element.main.temp_min - 273.15);

    let searchTemp = ''
    if(celcius > 0){
        searchTemp = 'Warm';
    } else {
        searchTemp = 'Cold';
    }

    const gifTemp = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${searchTemp}`, {mode: 'cors'})
    const tempResponse = await gifTemp.json();

    imgTemp.src = tempResponse.data.images.original.url;
    headingTemp.innerHTML = `Temperature ${celcius} C`;
}

async function getSky(element){
    const gifSky = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${element}`, {mode: 'cors'})
    const skyResponse = await gifSky.json();

    imgSky.src = skyResponse.data.images.original.url;
    headingSky.innerHTML = `${element} weather`;
}

async function getWind(element){
    let searchWind = ''
    if(element.wind.speed > 10){
        searchWind = 'Storm';
    } else {
        searchWind = 'Chill'
    }
    const gifWind = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${searchWind}`, {mode: 'cors'})
    const windResponse = await gifWind.json();

    imgWind.src = windResponse.data.images.original.url;
    headingWind.innerHTML = `${searchWind} wind`;
}

(async function firstTime(){

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

    imgSky.src = weatherResponse.data.images.original.url;

    const gifWind = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=wiwnd`, {mode: 'cors'})
    const windResponse = await gifWind.json();

    imgWind.src = windResponse.data.images.original.url;

    img.forEach(element => {
        element.style.display = 'block';
    });

    loader.forEach(element => {
        element.style.display = 'none';
    });

})();


document.querySelector('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        getWeather();
    }
});