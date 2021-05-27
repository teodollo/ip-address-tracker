//-------------DOM ELEMENTS-------------------//

const input = document.getElementById('input');// text input field for ip address
const searchField = document.getElementById('submit') // input bar and submit button
const ipInfo = document.getElementById('ip-info') //  ipInfo container
const ip = document.getElementById('ip') // ip information
const regionAndCity = document.getElementById('location') // region and city information
const timeZone = document.getElementById('time-zone') // time-zone information
const isp = document.getElementById('isp') // isp information


//--------------------EVENT LISTENERS-----------------//

searchField.addEventListener('click', e => {
    e.preventDefault() // preventing window from reloading when submitting 
    runMap(); // function that gives text input to api url that then makes the map and ip info, then runs map
    input.value = ''; // clears input when event listener gets activated

})

//---------------------- FUNCTIONS ------------------------------------//

function runMap() {
    let IP = input.value // value in input field at the time function is run
    let url = "https://geo.ipify.org/api/v1?apiKey=at_POcwIp0yQ8aj7ZeaSw9hzFqiCd5FI&ipAddress="; // the http link with api key, does no include ip that will be searched for 
    url += IP // adding the input value that should be an ip address to end of API url

    fetch(url) // fetch API url
    .then(data=>{return data.json()}) // convert json to readable JavaScript Object
    .then(JSONToObject=>{return JSONToObject}) // return the object that becomes ipInformation
    .then(ipInformation=>{
        if (ipInformation.ip) { // if the object contains an ip run the functions
            // makes sure the div containing the map always gets cleared when searching for new ip
            document.getElementById('map-container').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

            // Function that creates a map and locates it based on ipInformation
            createMap(ipInformation)

            // Ip info container changes based on ipInformation object
            ipInfoChange(ipInformation)
        } else ( alert('Provide a valid IP Address.' + '\n' + 'IP format: 8.8.8.8') ) // if object does not contain ip alert user
    })
}

// Create map on page with location that corelates with ip location and a marker 
const createMap = (ipInformation) => {
    let map = L.map('map').setView([ipInformation.location.lat, ipInformation.location.lng], 16);
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=avotrdWWFNvP4VidXL8k',{
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    crossOrigin: true
    }).addTo(map);

    L.marker([ipInformation.location.lat, ipInformation.location.lng]).addTo(map)//Map marker
        .openPopup();
}

// Gets iformation from ip and uses this to assign text content to the ip info container
const ipInfoChange = (ipInformation) => {
    ip.textContent = `${ipInformation.ip}`;
    regionAndCity.textContent = `${ipInformation.location.region}, ${ipInformation.location.city} ${ipInformation.location.postalCode}`;
    timeZone.textContent = `UTC ${ipInformation.location.timezone}`;
    isp.textContent = `${ipInformation.isp}`;
    ipInfo.style.display = 'grid'; // ipInfo container's will be displayed as grid when Ipinfo is available
}
