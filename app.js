
var map = L.map('map').setView([53, -7], 52);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=avotrdWWFNvP4VidXL8k',{
tileSize: 512,
zoomOffset: -1,
minZoom: 1,
attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
crossOrigin: true
}).addTo(map);