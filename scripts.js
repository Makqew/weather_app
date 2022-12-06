
getWeather('Chicago'); 

function renderDiv(responseData){
    // console.log(responseData[0]) // Heading text
    // console.log(responseData[1].data.images.original.url)// Gif src
    let content = document.getElementById('content')
    // console.log(content.innerHTML)
    // if (content.childNodes.length === 0) {
    //     console.log('✅ Element is empty');
    //   } else {
    //     console.log('⛔️ Element is NOT empty');
    //   }

    let div = document.createElement('div')
    let heading = document.createElement('h1')
    heading.innerHTML = responseData[0];

    let img = document.createElement('img');
    img.src = responseData[1].data.images.original.url;

    let divLoader = document.createElement('div');
    divLoader.classList.add('lds-dual-ring')

    div.appendChild(heading)
    div.appendChild(img)
    // div.appendChild(divLoader)
    // content.removeChild(div);
    content.appendChild(div)

}


async function getWeather(input){

    let content = document.getElementById('content')
    if (content.childNodes.length === 0) {
        console.log('✅ Element is empty');
      } else {
        console.log('⛔️ Element is NOT empty',content.childNodes);
        let child = content.lastElementChild
        while(child){
            content.removeChild(child);
            child = content.lastElementChild

        }
      }


    const loader = document.querySelectorAll('.lds-dual-ring');
    loader.forEach(element => {
        element.style.display = 'block';
    });
    
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=5dd5cc4a80a9feabbc954532502d6e3d`, {mode: 'cors'});
    const response = await data.json()


    Promise.all([getCity(response), getTemp(response), getSky(response), getWind(response)]).then(values => {
        // console.log(values)
        for(let element of values){
            renderDiv(element);
        }
        loader.forEach(element => {
            element.style.display = 'none';
        });
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
    
    // let src = cityResponse.data.images.original.url;
    // headingCity.innerHTML = element.name;
    return [element.name, cityResponse];
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

    // imgTemp.src = tempResponse.data.images.original.url;
    let textTemp = `Temperature ${celcius} C`;
    return [textTemp, tempResponse]
}

async function getSky(element){
    const gifSky = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=${element.weather[0].main}`, {mode: 'cors'})
    const skyResponse = await gifSky.json();

    // imgSky.src = skyResponse.data.images.original.url;
    let textSky = `${element.weather[0].main} weather`;
    return [textSky, skyResponse]
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

    // imgWind.src = windResponse.data.images.original.url;
    let textWind = `${searchWind} wind`;
    return [textWind, windResponse]
}

// (async function firstTime(){

//     img.forEach(element => {
//         element.style.display = 'none';
//     });

//     loader.forEach(element => {
//         element.style.display = 'block';
//     });

//     const gifCity = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=city`, {mode: 'cors'})
//     const cityResponse = await gifCity.json();

//     imgCity.src = cityResponse.data.images.original.url;


//     const gifTemp = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=temperature`, {mode: 'cors'})
//     const tempResponse = await gifTemp.json();
//     imgTemp.src = tempResponse.data.images.original.url;


//     const gifWeather = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=weather`, {mode: 'cors'})
//     const weatherResponse = await gifWeather.json();

//     imgSky.src = weatherResponse.data.images.original.url;

//     const gifWind = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=MjM6Afn8IsjJ2xj9QQ6e7Eu6FzEBtIR2&s=wiwnd`, {mode: 'cors'})
//     const windResponse = await gifWind.json();

//     imgWind.src = windResponse.data.images.original.url;

//     img.forEach(element => {
//         element.style.display = 'block';
//     });

//     loader.forEach(element => {
//         element.style.display = 'none';
//     });

// })();


document.querySelector('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        getWeather(document.querySelector('input').value);
    }
});
