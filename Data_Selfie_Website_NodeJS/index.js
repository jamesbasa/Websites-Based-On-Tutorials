// Server runs at http://localhost:3000
PORT = 3000;

const express = require('express');
const Datastore = require('nedb')

const app = express();
// Parse incoming requests with JSON payloads
app.use(express.json({ limit: '1mb' }));
// Use Express to host static files in the 'public' directory
app.use(express.static('public'));

// NeDB is an in-memory database good for small amounts of data
// It uses a subset of MongoDB's API
const database = new Datastore({
  filename: 'data.db'
});
database.loadDatabase();

/**
 * POST Request - adds new data
 */
app.post('/data', (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;
  // Returns ms elapsed since Jan 1, 1970
  const timestamp = Date.now();
  database.insert({
    lat,
    lon,
    timestamp
  });
  console.log('Added new data');

  res.send(JSON.stringify({
    status_code: 200,
    lat,
    lon,
    timestamp
  }, null, 4));
});

/**
 * GET Request - gets all data
 */
app.get('/data', (req, res) => {
  database.find({}, (err, data) => {
    // data is an object of the database entries
    if (err) {
      console.log('Could not get data');

      res.send(JSON.stringify({
        status_code: 404,
        data
      }, null, 4));
    }
    else {
      console.log('Got all data');

      res.send(JSON.stringify({
        status_code: 200,
        data
      }, null, 4));
    }
  });
});

app.listen( PORT, () => console.log(`Listening on port ${PORT}`));
