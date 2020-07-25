const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


const selectInput = document.querySelector('.search')
const selectUl = document.querySelector('.suggestions')

//fetch it
//plz see the relavent notion notes, I am not gonna make many comments as I am running out of time

const places = []

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => places.push(...data))

//work with fetch data 

//filter the massive data

const findMatchedPlace = function (placeToFind, places) {
    const regex = new RegExp(placeToFind, 'gi')
    return places.filter(place => {
        return place.city.match(regex) || place.state.match(regex)
    })
}

//Source:  http://bit.ly/2vpL9TI
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//display the filtered data
const displayFilteredData = function () {
    const filteredPlaces = findMatchedPlace(this.value, places)

    //we need to generate html for each of them
    const htmlString = filteredPlaces.map(filteredPlace => {
        const regex = new RegExp(this.value, 'gi')

        //for highlighting
        const highlightedCity = filteredPlace.city.replace(regex, `<span class='hl'>${this.value}</span>`)
        const highlightedSatate = filteredPlace.state.replace(regex, `<span class='hl'>${this.value}</span>`)

        return `
        <li>
        <span class="name">${highlightedCity}, ${highlightedSatate}</span>
        <span class="population">${numberWithCommas(filteredPlace.population)}</span>
        </li> 
        `
    }).join('')
    selectUl.innerHTML = htmlString
}

selectInput.addEventListener('input', displayFilteredData)