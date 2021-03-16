// make a map and tiles
const mymap = L.map('map').setView([0, 0], 1);
const attribution =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// add a marker
const marker = L.marker([0, 0]).addTo(mymap);


// Geolocation API allows the user to provide their location 
// to web applications if they so desire
if ('geolocation' in navigator) {
	console.log('geolocation available');
	navigator.geolocation.getCurrentPosition(position =>
		{
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			marker.setLatLng([lat, lon]);
			mymap.setView([lat, lon], 4);
			document.getElementById('lat').textContent = lat.toFixed(2);
			document.getElementById('lon').textContent = lon.toFixed(2);
		});
}
else {
	console.log('geolocation not available');
	// hide the map
	document.getElementById("map").style.display = "none";
}
