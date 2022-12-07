
getWeather('Chicago'); 

function renderDiv(responseData){
    // console.log(responseData[0]) // Heading text
    // console.log(responseData[1].data.images.original.url)// Gif src
    let content = document.getElementById('content')

    let div = document.createElement('div')
    
    // Creating h1 element
    let heading = document.createElement('h1')
    heading.innerHTML = responseData[0];

    // Creating img element
    let img = document.createElement('img');
    img.src = responseData[1].data.images.original.url;

    div.appendChild(heading)
    div.appendChild(img)
    content.appendChild(div)

}


async function getWeather(input){
    // Checking if the page is empty
    const content = document.getElementById('content')
    if (content.childNodes.length === 0) {
        console.log('✅ Element is empty');
      } else {
        console.log('⛔️ Element is NOT empty',content.childNodes);
        let child = content.lastElementChild
        while(child){
            content.removeChild(child); // If not empty remove elements from the page
            child = content.lastElementChild

        }
      }


    const loader = document.querySelectorAll('.lds-dual-ring');
    loader.forEach(element => {
        element.style.display = 'block'; // Showing loaders on the page
    });
    try{
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=5dd5cc4a80a9feabbc954532502d6e3d`, {mode: 'cors'});
        const response = await data.json()
    
    
        Promise.all([getCity(response), getTemp(response), getSky(response), getWind(response)])
        .then(values => {
            for(let element of values){
                renderDiv(element);
            }
            loader.forEach(element => {
                element.style.display = 'none';
            });
        }).catch(err => {
            showError('There is no city like this, try another', err)
        });
    } catch(err){
        showError('There is server problems, try later', err);
    }
    

    // console.log(response)
    // console.log('City ', response.name)
    // console.log('Minimal temperature ', response.main.temp_min,'K')
    // console.log('Weather ', response.weather[0].main)
    // console.log('Speed ', response.wind.speed)    
}

async function getCity(element){
    try{
        const gifCity = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${element.name}`, {mode: 'cors'})
        const cityResponse = await gifCity.json();
        
        return [element.name, cityResponse];
    } catch(err){
        showError('There is GIF server problems, try later', err);
    }
}

async function getTemp(element){
    try {
        let celcius = Math.round(element.main.temp_min - 273.15);

        let searchTemp = ''
        if(celcius > 0){
            searchTemp = 'Warm';
        } else {
            searchTemp = 'Cold';
        }
    
        const gifTemp = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${searchTemp}`, {mode: 'cors'})
        const tempResponse = await gifTemp.json();
    
        let textTemp = `Temperature ${celcius} C`;
        return [textTemp, tempResponse]
    } catch(err){
        showError('There is GIF server problems, try later', err);
    }
    
}

async function getSky(element){
    try {
        const gifSky = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${element.weather[0].main}`, {mode: 'cors'})
        const skyResponse = await gifSky.json();
    
        let textSky = `${element.weather[0].main} weather`;
        return [textSky, skyResponse]
    } catch(err){
        showError('There is GIF server problems, try later', err);
    }
}

async function getWind(element){
    try {
        let searchWind = ''
        if(element.wind.speed > 10){
            searchWind = 'Storm';
        } else {
            searchWind = 'Chill'
        }
        const gifWind = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${searchWind}`, {mode: 'cors'})
        const windResponse = await gifWind.json();
    
        // imgWind.src = windResponse.data.images.original.url;
        let textWind = `${searchWind} wind`;
        return [textWind, windResponse]
    } catch(err){
        showError('There is GIF server problems, try later', err);
    }

}

function showError(text, error){
    console.log('This is the error: ', error);
    
    const content = document.getElementById('content')
    const errorHeading = document.createElement('p')
    errorHeading.innerHTML = text;
    errorHeading.style.color = 'red';

    content.appendChild(errorHeading);
}

// Submit when hit Enter in input
document.querySelector('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        getWeather(document.querySelector('input').value);
    }
});
