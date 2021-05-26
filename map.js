const input = document.getElementById('input');
const searchField = document.getElementById('submit')
const ipInfo = document.getElementById('ip-info')
const ip = document.getElementById('ip')
const regionAndCity = document.getElementById('location')
const timeZone = document.getElementById('time-zone')
const isp = document.getElementById('isp')

function runMap() {
    const Http = new XMLHttpRequest();
    let IP = input.value;
    let url="https://geo.ipify.org/api/v1?apiKey=at_POcwIp0yQ8aj7ZeaSw9hzFqiCd5FI&ipAddress=";
    url += IP;
    Http.open('GET', url);
    Http.send();

    Http.onreadystatechange = (e) => {
        if(e.currentTarget.readyState == 4 && e.currentTarget.status == 200) {
            const object = JSON.parse(Http.responseText);
            
            var map = L.map('map').setView([object.location.lat, object.location.lng], 14);
            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=avotrdWWFNvP4VidXL8k',{
            tileSize: 512,
            zoomOffset: -1,
            minZoom: 1,
            crossOrigin: true
            }).addTo(map);
        
            L.marker([object.location.lat, object.location.lng]).addTo(map)
                .openPopup();


            ip.textContent = `${object.ip}`;
            regionAndCity.textContent = `${object.location.region}, ${object.location.city} ${object.location.postalCode}`;
            timeZone.textContent = `UTC ${object.location.timezone}`;
            isp.textContent = `${object.isp}`;
            ipInfo.style.display = 'block';

        }


    }     
}


searchField.addEventListener('click', e => {
    e.preventDefault()
    let map = document.getElementById('map');
    map = null;
    runMap();
    input.value = '';

})
