/**
 * Gets data from server
 */
async function getData() {
	// POST request
	const res = await fetch("/data");
	const data = await res.json();

	for (item of data.data) {
		// create a div for each item in the data object
		const root = document.createElement('div');
		const mood = document.createElement('div');
		const geo = document.createElement('div');
		const date = document.createElement('div');
		const br = document.createElement('br');

		// format the data
		if (item.lat !== undefined && item.lat !== null) {
			geo.textContent = `${item.lat}°, ${item.lon}°`;
		}
		const dateString = new Date(item.timestamp).toLocaleString();
		date.textContent = dateString;

		// display the data
		root.append(mood, geo, date, br);
		document.body.append(root);
	}
	console.log(data);

}

getData();