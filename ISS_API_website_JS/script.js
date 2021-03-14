// make a map and tiles
const mymap = L.map('map').setView([0, 0], 1);
const attribution =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// make a marker with a custom icon
const issIcon = L.icon({
	iconUrl: 'iss200.png',
	iconSize: [50, 32],
	iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
let firstRun = true;

async function getISS(){
	// fetch API data
	const response = await fetch(api_url);
	const data = await response.json();
	const {latitude, longitude} = data;

	marker.setLatLng([latitude, longitude]);
	if (firstRun){
		mymap.setView([latitude, longitude], 3);
		firstRun = false;
	}

	document.getElementById('lat').textContent = latitude.toFixed(2);
	document.getElementById('lon').textContent = latitude.toFixed(2);
}

getISS();

// call function every 2 seconds (WTIA API rate limit = 1)
setInterval(getISS, 2000);